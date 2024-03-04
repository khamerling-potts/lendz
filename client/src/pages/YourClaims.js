import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Listing from "../components/Listing";
import ListingPreview from "../components/ListingPreview";

function YourClaims() {
  const {
    currentUser,
    listings,
    selectedListing,
    setSelectedListing,
    handleEditListing,
    requestListings,
  } = useOutletContext();
  const yourClaimedListings = listings.filter((listing) => {
    return listing.claims.some((claim) => claim.user_id === currentUser.id);
  });

  const listingsToDisplay = yourClaimedListings.map((listing) => (
    <ListingPreview
      key={listing.id}
      listing={listing}
      setSelectedListing={setSelectedListing}
      currentUser={currentUser}
      // handleEditListing={handleEditListing}
      // handleDeleteListing={handleDeleteListing}
      requestListings={requestListings}
    />
  ));

  return (
    <div className="page">
      <div className="container ">
        <h1>Your Claimed Listings</h1>

        {selectedListing ? (
          <Listing
            listing={selectedListing}
            setSelectedListing={setSelectedListing}
            currentUser={currentUser}
            handleEditListing={handleEditListing}
            // handleDeleteListing={handleDeleteListing}
            requestListings={requestListings}
          />
        ) : (
          <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4 overflow-auto pt-5 pb-5">
            {listingsToDisplay}
          </div>
        )}
      </div>
    </div>
  );
}

export default YourClaims;
