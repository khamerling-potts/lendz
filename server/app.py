#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Model imports
from models import User, Listing, Claim


### RESOURCES ###


# ONLY used to clear the database in development
# Uncomment the model that you want to clear
class ResetDB(Resource):
    def get(self):
        # User.query.delete()
        # Listing.query.delete()
        Claim.query.delete()
        db.session.commit()
        return {"message": "200 - Successfully cleared database"}, 200


# Authorizing requests
@app.before_request
def check_logged_in():
    if request.endpoint not in [
        "users",
        "login",
        "reset",
        "check_username",
        "check_session",
    ]:
        print("checking logged in")
        if not session.get("user_id"):
            return {"error": "Unauthorized"}, 401


# Users Resource that gets all users or creates a new user
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200

    def post(self):
        data = request.get_json()
        [username, password] = [data.get("username"), data.get("password")]
        try:
            new_user = User(username=username, ratings=None)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            return new_user.to_dict(), 201
        except Exception as exc:
            print(exc)
            return {"error": "422 - Unprocessable Entity"}, 422


# UserByID Resource that updates a given user.
# Currently only applicable when rating a user, but may be used to update a user's account.
class UserByID(Resource):
    def patch(self, id):
        data = request.get_json()
        try:
            updated_user = User.query.filter_by(id=id).first()
            for attr in data:
                # If a user has ratings, append the new one to the list
                if attr == "rating":
                    if updated_user.ratings:
                        updated_user.ratings.append(data["rating"])
                    else:
                        updated_user.ratings = [data["rating"]]
                else:
                    setattr(updated_user, attr, data[attr])
            db.session.add(updated_user)
            db.session.commit()
            print(updated_user)
            return updated_user.to_dict(), 200
        except Exception as exc:
            print(exc)
            return {"error": "422 - Unprocessable Entity"}, 422


# Checks if logged in when app loads
class CheckSession(Resource):
    def get(self):
        if request.endpoint != "reset" and request.endpoint != "user":
            user_id = session.get("user_id")
            if user_id:
                user = User.query.filter_by(id=user_id).first()
                return user.to_dict(), 200
            else:
                return {}, 401


# Sets session user id when logging in and returns current user
class Login(Resource):
    def post(self):
        data = request.get_json()
        [username, password] = [data.get("username"), data.get("password")]
        user = User.query.filter_by(username=username.lower()).first()
        if user and user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(), 200
        return {"error": "401 - Unauthorized"}, 401


# Deletes session user id when logging out
class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return {}, 204


# Checks whether username is taken when signing up
class CheckUsername(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        user = User.query.filter_by(username=username.lower()).first()
        if user:
            return {"error": "409 - Conflict"}, 409
        return {}, 200


# Users Resource that gets all users or creates a new user
class Listings(Resource):
    def get(self):
        listings = [listing.to_dict() for listing in Listing.query.all()]
        return listings, 200

    def post(self):
        data = request.get_json()

        [title, img_url, description, zip, meeting_place] = [
            data.get("title"),
            data.get("img_url"),
            data.get("description"),
            data.get("zip"),
            data.get("meeting_place"),
        ]
        user_id = session.get("user_id")

        try:
            listing = Listing(
                title=title,
                description=description,
                zip=zip,
                user_id=user_id,
            )
            if img_url != "":
                setattr(listing, "img_url", img_url)
            if meeting_place != "":
                setattr(listing, "meeting_place", meeting_place)
            db.session.add(listing)
            db.session.commit()
            return listing.to_dict(), 200
        except Exception as exc:
            print(exc)
            return {
                "error": "422 - Unprocessable Entity (could not create listing)"
            }, 422


# ListingByID Resource that updates or deletes a listing
class ListingByID(Resource):
    def patch(self, id):
        listing = Listing.query.filter_by(id=id).first()
        data = request.get_json()

        try:
            # If someone deletes the optional img url or meeting place from their listing,
            # set them back to the defaults
            for attr in data:
                if attr == "img_url" and data[attr] == "":
                    setattr(
                        listing,
                        attr,
                        "https://weedman.com/images/no-available-image.jpg",
                    )
                elif attr == "meeting_place" and data[attr] == "":
                    setattr(listing, attr, "TBD")
                else:
                    setattr(listing, attr, data[attr])

            db.session.add(listing)
            db.session.commit()
            return listing.to_dict(), 200
        except:
            return {"error": "422 - Unprocessable Entity"}, 422

    def delete(self, id):
        listing = Listing.query.filter_by(id=id).first()
        db.session.delete(listing)
        db.session.commit()
        return {"message": "listing successfully deleted"}, 204


# Claims Resource that gets all claims or creates a claim
class Claims(Resource):
    def get(self):
        claims = [claim.to_dict() for claim in Claim.query.all()]
        return claims, 200

    # Returns the listing updated with its new claim. This simplifies updating state on the front end.
    def post(self):
        data = request.get_json()
        [comment, listing_id] = [
            data.get("comment"),
            data.get("listing_id"),
        ]
        user_id = session.get("user_id")

        if listing_id:
            try:
                updated_claim = Claim(
                    comment=comment,
                    user_id=user_id,
                    listing_id=listing_id,
                )
                db.session.add(updated_claim)
                db.session.commit()
                listing = Listing.query.filter_by(id=listing_id).first()
                return listing.to_dict(), 200
            except:
                return {
                    "error": "422 - Unprocessable Entity (could not create claim)"
                }, 422
        else:
            return {"error": "404 - Listing Not Found"}, 404


# ClaimByID Resource that updates a claim
# Currently only used when selecting a claim, but may be used in the future for editing them
class ClaimByID(Resource):
    # Returns updated listing with newly selected claim
    def patch(self, id):
        user_id = session.get("user_id")

        data = request.get_json()
        try:
            updated_claim = Claim.query.filter_by(id=id).first()

            # if we're selecting a claim, unselect all others first
            if data.get("action") == "select":
                for claim in updated_claim.listing.claims:
                    claim.selected = False

            for attr in data:
                if attr != "action":
                    setattr(updated_claim, attr, data[attr])

            # Commit all adjacent listings before retrieving updated listing
            db.session.add_all(updated_claim.listing.claims)
            db.session.commit()

            listing = Listing.query.filter_by(id=updated_claim.listing.id).first()
            return listing.to_dict(), 200
        except:
            return {"error": "422 - Unprocessable Entity"}, 422


@app.route("/")
@app.route("/<int:id>")
def index(id=0):
    return "<h1>Project Server</h1>"


api.add_resource(Users, "/users", endpoint="users")
api.add_resource(UserByID, "/users/<int:id>", endpoint="user")
api.add_resource(ResetDB, "/reset", endpoint="reset")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(CheckUsername, "/check_username", endpoint="check_username")
api.add_resource(Listings, "/listings", endpoint="listings")
api.add_resource(ListingByID, "/listings/<int:id>", endpoint="listing")
api.add_resource(Claims, "/claims", endpoint="claims")
api.add_resource(ClaimByID, "/claims/<int:id>", endpoint="claim")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
