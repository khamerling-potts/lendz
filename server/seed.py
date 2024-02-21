#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Listing, Claim

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Reseting database...")
        Listing.query.delete()
        User.query.delete()
        db.session.commit()

        print("Starting seed...")
        # Seed code goes here!

        user1 = User(username="user1", rating=None)
        user1.password_hash = "password1"
        user2 = User(username="user2", rating=None)
        user2.password_hash = "password2"
        users = [user1, user2]

        db.session.add_all(users)
        db.session.commit()
        print(users)

        listings = [
            Listing(
                title="Baking sheet",
                img_url="https://target.scene7.com/is/image/Target/GUEST_312234e2-4119-47f6-b673-b51c28d34afb?wid=488&hei=488&fmt=pjpeg",
                description="Giving away this standard size baking sheet. Hardly used.",
                zip=20008,
                meeting_place="Politics & Prose",
                user=user1,
                user_id=user1.id,
            ),
            Listing(
                title="Razor Scooter",
                img_url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Razor_old_a.jpg/800px-Razor_old_a.jpg",
                description="My kid's old razor scooter, in good condition. They just grew out of it",
                zip=20016,
                meeting_place="Murch Elementary School",
                user=user2,
                user_id=user2.id,
            ),
            Listing(
                title="Lawn Mowing Service",
                img_url="https://res.cloudinary.com/taskrabbit-com/image/upload/f_auto,q_auto/bvnlcg3sr9wdtoikd1im",
                description="My son is home this weekend and is offering to mow a neighbor's lawn for free!",
                zip=40015,
                meeting_place="TBD",
                user=user2,
                user_id=user2.id,
            ),
            Listing(
                title="Assorted Women's Clothes",
                img_url="https://weedman.com/images/no-available-image.jpg",
                description="I have a bunch of women's clothes ranging from XS-L. Please take all.",
                zip=38562,
                meeting_place="1st and Washington Ave",
                user=user1,
                user_id=user1.id,
            ),
        ]

        db.session.add_all(listings)
        db.session.commit()
        print("Finished seed")
