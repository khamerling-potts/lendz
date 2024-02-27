import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Listing from "../components/Listing";
import CreateListingForm from "../components/CreateListingForm";

function YourListings() {
  // const [yourListings, setYourListings] = useState([]);
  const {
    currentUser,
    listings,
    handleEditListing,
    handleDeleteListing,
    handleCreateListing,
  } = useOutletContext();
  const yourListings = listings.filter(
    (listing) => listing.user_id === currentUser.id
  );

  // useEffect(() => {
  //   fetch("/your_listings").then((r) => {
  //     if (r.ok) {
  //       r.json().then((listings) => setYourListings(listings));
  //     }
  //   });
  // }, []);

  const listingsToDisplay = yourListings.map((listing) => (
    <Listing
      key={listing.id}
      listing={listing}
      currentUser={currentUser}
      handleEditListing={handleEditListing}
      handleDeleteListing={handleDeleteListing}
    />
  ));

  return (
    <div>
      <h1>Your Listings</h1>
      <CreateListingForm handleCreateListing={handleCreateListing} />
      <div className="container overflow-auto pt-5 pb-5">
        <div className="row row-cols-lg-3 row-cols-sm-2 g-4">
          {listingsToDisplay}
        </div>
      </div>
    </div>
  );
}

export default YourListings;
