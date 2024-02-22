import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Listing from "../components/Listing";

function Home() {
  const { currentUser, listings, handleEditListing, handleDeleteListing } =
    useOutletContext();

  const listingsToDisplay = listings.map((listing) => (
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
      <h1>Home</h1>
      <div className="container">
        <div className="row justify-content-evenly">{listingsToDisplay}</div>
      </div>
    </div>
  );
}
export default Home;
