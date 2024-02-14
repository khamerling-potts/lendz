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
        [username, password] = [data["username"], data["password"]]
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


@app.route("/")
@app.route("/<int:id>")
def index():
    return "<h1>Project Server</h1>"


api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(ResetDB, "/reset", endpoint="reset")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
