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
    <>
      <h1>Home</h1>
      <div className="container pt-5 pb-5">
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4 overflow-auto">
          {listingsToDisplay}
        </div>
      </div>
    </>
  );
}
export default Home;
