#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User


# Views go here!


# ONLY used to clear the database in development. Consider commenting out for production
class ResetDB(Resource):
    def get(self):
        User.query.delete()
        db.session.commit()
        return {"message": "200 - Successfully cleared User database"}, 200


class Signup(Resource):
    def post(self):
        data = request.get_json()
        print(data)
        [username, password] = [data.get("username"), data.get("password")]
        new_user = User(username=username, rating=None)
        new_user.password_hash = password
        try:
            print(new_user)
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            return new_user.to_dict(), 201
        except Exception as exc:
            return {"error": "422 - Unprocessable Entity"}, 422


class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.filter_by(id=user_id).first()
            return user.to_dict(), 200
        else:
            return {}, 401


class Login(Resource):
    def post(self):
        data = request.get_json()
        [username, password] = [data.get("username"), data.get("password")]
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(), 200
        return {"error": "401 - Unauthorized"}, 401


class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None
            return {}, 204
        return {"error": "401 - Unauthorized"}, 401


class CheckUsername(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        user = User.query.filter_by(username=username).first()
        if user:
            return {"error": "409 - Conflict"}, 409
        return {}, 200


@app.route("/")
@app.route("/<int:id>")
def index():
    return "<h1>Project Server</h1>"


api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(ResetDB, "/reset", endpoint="reset")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(CheckUsername, "/check_username", endpoint="check_username")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
