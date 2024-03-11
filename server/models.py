from sqlalchemy import func
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates


from config import db, bcrypt


# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = (
        "-owned_listings.user",
        "-owned_listings.claimed_users",
        "-_password_hash",
        "-claims.user",
        "-claimed_listings.user",
        "-claimed_listings.claimed_users",
    )

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    ratings = db.Column(MutableList.as_mutable(ARRAY(db.Integer)), nullable=True)
    _password_hash = db.Column(db.String)

    # Relationship mapping users to their owned listings (one to many)
    owned_listings = db.relationship(
        "Listing", back_populates="user", cascade="all, delete-orphan"
    )

    # Relationship mapping users to their claims (one to many)
    claims = db.relationship(
        "Claim", back_populates="user", cascade="all, delete-orphan"
    )

    # Association proxy mapping users to their claimed listings (many to many)
    claimed_listings = association_proxy(
        "claims",
        "listing",
        creator=lambda listing_obj: Claim(claimed_listing=listing_obj),
    )

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    @validates("username")
    def validate_username(self, key, username):
        if username == "":
            raise ValueError("username must not be empty")
        if db.session.query(User.id).filter_by(username=username.lower()).first():
            raise ValueError("username must be unique")
        return username.lower()

    def __repr__(self):
        return f"User {self.username}, ID {self.id}"


class Listing(db.Model, SerializerMixin):
    __tablename__ = "listings"

    serialize_rules = (
        "-user.owned_listings",
        "-user.claimed_listings",
        "-claimed_users.claimed_listings",
        "-claimed_users.owned_listings",
        "-claims.listing",
    )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    img_url = db.Column(
        db.String,
        server_default="https://weedman.com/images/no-available-image.jpg",
        nullable=False,
    )
    description = db.Column(db.String, nullable=False)
    zip = db.Column(db.Integer, nullable=False)
    meeting_place = db.Column(db.String, server_default="TBD", nullable=False)

    # Foreign key and relationship mapping listings to the user that owns them
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User", back_populates="owned_listings")

    # Relationship mapping listings to their claims (one to many)
    claims = db.relationship(
        "Claim", back_populates="listing", cascade="all, delete-orphan"
    )

    # Association proxy mapping listings to their claimed users (many to many)
    claimed_users = association_proxy(
        "claims", "user", creator=lambda user_obj: Claim(claimed_user=user_obj)
    )

    @validates("title")
    def validate_title(self, key, title):
        if title == "":
            raise ValueError("title must not be empty")
        if len(title) > 50:
            raise ValueError("Title must be less than 50 characters")
        return title

    @validates("description")
    def validates_description(self, key, description):
        if description == "":
            raise ValueError("description must not be empty")
        if len(description) > 100:
            raise ValueError("description must be less than 100 chars")
        return description

    # Validate zip when it comes in as an int or str (seed data vs json from front end)
    @validates("zip")
    def validates_zip(self, key, zip):
        if isinstance(zip, int) and 10000 <= zip <= 99999:
            return zip
        if zip.isDigit() and len(zip) == 5:
            return int(zip)  # add number conversion?
        raise ValueError("zip code must be a 5 digit number")

    @validates("img_url")
    def validares_img_url(self, key, img_url):
        if not img_url:
            raise ValueError("img url must be present")
        return img_url

    def __repr__(self):
        return f"Listing {self.title}, ID {self.id}"


class Claim(db.Model, SerializerMixin):
    __tablename__ = "claims"

    serialize_rules = (
        "-user.owned_listings",
        "-user.claims",
        "-user.claimed_listings",
        "-listing.claims",
        "-listing.claimed_users",
        "-listing.user",
    )

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String, nullable=False)
    time = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    selected = db.Column(db.Boolean, server_default="false", nullable=False)

    # Foreign key and relationship mapping claims to users
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User", back_populates="claims")

    # Foreign key and relationship mapping claims to listings
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.id"))
    listing = db.relationship("Listing", back_populates="claims")

    def __repr__(self):
        return f"Claim {self.id}, {self.comment}"
