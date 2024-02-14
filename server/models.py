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

    # add relationships after making other models

    # what is this?
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash

    def authenticate(self, password):
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
