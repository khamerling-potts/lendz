import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Listing from "../components/Listing";

function Home() {
  const { currentUser, listings, handleEditListing } = useOutletContext();

  const listings_to_display = listings.map((listing) => (
    <Listing
      key={listing.id}
      listing={listing}
      currentUser={currentUser}
      handleEditListing={handleEditListing}
    />
  ));

  return (
    <div>
      <h1>Home</h1>
      <div className="container">
        <div className="row justify-content-evenly">{listings_to_display}</div>
      </div>
    </div>
  );
}
export default Home;
