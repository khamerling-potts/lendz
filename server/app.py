#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Listing, Claim


# Views go here!


# ONLY used to clear the database in development. Consider commenting out for production
class ResetDB(Resource):
    def get(self):
        User.query.delete()
        db.session.commit()
        return {"message": "200 - Successfully cleared User database"}, 200


# Authorize user before any requests to browse listings,
@app.before_request
def check_logged_in():
    if request.endpoint in ["browse_listings"] and not session.get("user_id"):
        return {"error": "401 - Unauthorized"}, 401


class Signup(Resource):
    def post(self):
        data = request.get_json()
        [username, password] = [data.get("username"), data.get("password")]
        try:
            new_user = User(username=username, rating=None)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            return new_user.to_dict(), 201
        except Exception as exc:
            return {"error": "422 - Unprocessable Entity"}, 422


class CheckSession(Resource):
    def get(self):
        if request.endpoint != "reset" and request.endpoint != "signup":
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
        user = User.query.filter_by(username=username.lower()).first()
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
        user = User.query.filter_by(username=username.lower()).first()
        if user:
            return {"error": "409 - Conflict"}, 409
        return {}, 200


class BrowseListings(Resource):
    def get(self):
        listings = [listing.to_dict() for listing in Listing.query.all()]
        return listings, 200


class ListingByID(Resource):
    def patch(self, id):
        listing = Listing.query.filter_by(id=id).first()
        data = request.get_json()
        try:
            for attr in data:
                setattr(listing, attr, data.get(attr))
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


class CreateListing(Resource):
    def post(self):
        data = request.get_json()
        print(data)
        # use setattr?
        # use a conditional and only set if it has value (create helper function for this)

        [title, img_url, description, zip, meeting_place] = [
            data.get("title"),
            data.get("img_url"),
            data.get("description"),
            data.get("zip"),
            data.get("meeting_place"),
        ]
        user_id = session.get("user_id")
        # print(user_id)
        # user = User.query.filter_by(id=user_id).first()
        if user_id:
            try:
                listing = Listing(
                    title=title,
                    description=description,
                    zip=zip,
                    user_id=user_id,
                )
                print(listing)
                if img_url:
                    setattr(listing, "img_url", img_url)
                print(2)
                if meeting_place:
                    setattr(listing, "meeting_place", meeting_place)
                print(3)
                db.session.add(listing)
                db.session.commit()
                return listing.to_dict(), 200
            except Exception as exc:
                print(exc)
                return {
                    "error": "422 - Unprocessable Entity (could not create listing)"
                }, 422
        else:
            return {"error": "401 - Unauthorized (user not found)"}, 422


class CreateClaim(Resource):
    def post(self):
        data = request.get_json()
        [comment, listing_id] = [
            data.get("comment"),
            data.get("listing_id"),
        ]
        user_id = session.get("user_id")
        # user = User.query.filter_by(id=user_id).first()
        # listing = Listing.query.filter_by(id=listing_id).first()

        if user_id and listing_id:
            try:
                claim = Claim(
                    comment=comment,
                    user_id=user_id,
                    listing_id=listing_id,
                )
                print(claim.user_id)
                db.session.add(claim)
                db.session.commit()
                listing = Listing.query.filter_by(id=listing_id).first()
                return listing.to_dict(), 200
            except:
                return {
                    "error": "422 - Unprocessable Entity (could not create claim)"
                }, 422
        else:
            return {"error": "422 - Unprocessable Entity (user or listing not found)"}


# don't think I need this bc I can filter through all listings on the front end
# class YourListings(Resource):
#     # id refers to user id so you can browse your owned listings
#     def get(self):
#         user_id = session.get("user_id")
#         if user_id:
#             user = User.query.filter_by(id=user_id).first()
#             owned_listings = [listing.to_dict() for listing in user.owned_listings]
#             return owned_listings, 200
#         return {"error": "401 - Unauthorized"}, 401


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
api.add_resource(BrowseListings, "/browse_listings", endpoint="browse_listings")
api.add_resource(ListingByID, "/listings/<int:id>", endpoint="listings/<int:id>")
api.add_resource(CreateListing, "/create_listing", endpoint="create_listing")
api.add_resource(CreateClaim, "/create_claim", endpoint="create_claim")
# api.add_resource(YourListings, "/your_listings", endpoint="your_listings")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
