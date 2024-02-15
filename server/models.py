from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates


from config import db, bcrypt


# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    rating = db.Column(db.Float, db.CheckConstraint("1 <= rating <= 5"), nullable=True)
    _password_hash = db.Column(db.String)

    owned_listings = db.relationship(
        "Listing", back_populates="user", cascade="all, delete-orphan"
    )

    # what is this?
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        print(bcrypt.generate_password_hash("password".encode("utf-8")))
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    @validates("username")
    def validate_username(self, key, username):
        if username == "":
            raise ValueError("username must not be empty")
        if db.session.query(User.id).filter_by(username=username).first():
            raise ValueError("username must be unique")
        return username

    def __repr__(self):
        return f"User {self.username}, ID {self.id}"


class Listing(db.Model, SerializerMixin):
    __tablename__ = "listings"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    zip = db.Column(db.Integer, nullable=False)
    meeting_place = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User", back_populates="owned_listings")

    @validates("title")
    def validate_title(self, key, title):
        if title == "":
            raise ValueError("title must not be empty")
        if len(title) > 50:
            raise ValueError("Title must be less than 50 characters")

    @validates("description")
    def validates_description(self, key, description):
        if description == "":
            raise ValueError("description must not be empty")
        if len(description) > 100:
            raise ValueError("description must be less than 100 chars")

    @validates("zip")
    def validates_zip(self, key, zip):
        if zip.isDigit() and len(zip) == 5:
            return zip  # add number conversion?
        raise ValueError("zip code must be a 5 digit number")

    def __repr__(self):
        return f"Listing {self.title}, ID {self.id}"
