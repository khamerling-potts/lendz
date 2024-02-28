import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Listing from "../components/Listing";

function Home() {
  const {
    currentUser,
    listings,
    handleEditListing,
    handleDeleteListing,
    requestListings,
  } = useOutletContext();

  const listingsToDisplay = listings.map((listing) => (
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
    <>
      <h1>Home</h1>
      <div className="container ">
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4 overflow-auto pt-5 pb-5">
          {listingsToDisplay}
        </div>
      </div>
    </>
  );
}
export default Home;
