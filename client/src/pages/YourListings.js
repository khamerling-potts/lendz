import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Listing from "../components/Listing";
import CreateListingForm from "../components/CreateListingForm";
import { Button } from "react-bootstrap";

function YourListings() {
  //const [yourListings, setYourListings] = useState([]);

  const {
    currentUser,
    //updateListings,
    listings,
    handleEditListing,
    handleDeleteListing,
    handleCreateListing,
    requestListings,
  } = useOutletContext();
  const yourListings = listings.filter(
    (listing) => listing.user_id === currentUser.id
  );

  // useEffect(() => {
  //   setYourListings(currentUser.owned_listings.sort((a, b) => a.id - b.id));
  // }, []);

  // function handleEditListing(listing) {
  //   const updatedListings = updateListings(yourListings, "edit", listing);
  //   setYourListings(updatedListings);
  // }

  // function handleDeleteListing(id) {
  //   const updatedListings = updateListings(yourListings, "delete", null, id);
  //   setYourListings(updatedListings);
  // }

  const listingsToDisplay = yourListings.map((listing) => (
    <Listing
      key={listing.id}
      listing={listing}
      currentUser={currentUser}
      handleEditListing={handleEditListing}
      handleDeleteListing={handleDeleteListing}
      requestListings={requestListings}
    />
  ));

  return (
    <div className="page">
      <h1>Your Listings</h1>
      <Button
        data-bs-toggle="collapse"
        data-bs-target="#createListingForm"
        aria-expanded="false"
        aria-controls="createListingForm"
      >
        Create Listing
      </Button>
      <div className="collapse" id="createListingForm">
        <CreateListingForm handleCreateListing={handleCreateListing} />
      </div>

      <div className="container ">
        <div className="row row-cols-lg-3 row-cols-md-1 row-cols-sm-1 row-cols-xs-1 g-4 overflow-auto pt-5 pb-5">
          {listingsToDisplay}
        </div>
      </div>
    </div>
  );
}

export default YourListings;
