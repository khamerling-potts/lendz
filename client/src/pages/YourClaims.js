import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Listing from "../components/Listing";

function YourClaims() {
  const { currentUser, listings, requestListings } = useOutletContext();
  const yourClaimedListings = listings.filter((listing) => {
    return listing.claims.some((claim) => claim.user_id === currentUser.id);
  });

  const listingsToDisplay = yourClaimedListings.map((listing) => (
    <Listing
      key={listing.id}
      listing={listing}
      currentUser={currentUser}
      // handleEditListing={handleEditListing}
      // handleDeleteListing={handleDeleteListing}
      requestListings={requestListings}
    />
  ));

  return (
    <div>
      <h1>Your Claimed Listings</h1>
      <div className="container ">
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4 overflow-auto pt-5 pb-5">
          {listingsToDisplay}
        </div>
      </div>
    </div>
  );
}

export default YourClaims;
