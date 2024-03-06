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
      requestListings={requestListings}
    />
  ));

  return (
    <div className="page">
      <h1>Your Claimed Listings</h1>

      {selectedListing ? (
        <Listing
          listing={selectedListing}
          setSelectedListing={setSelectedListing}
          currentUser={currentUser}
          handleEditListing={handleEditListing}
          requestListings={requestListings}
        />
      ) : listingsToDisplay.length ? (
        <div className="preview-row row row-cols-lg-4 row-cols-md-2 row-cols-sm-1 g-4">
          {listingsToDisplay}
        </div>
      ) : (
        <div className="empty">
          You have not claimed any listings. Browse available listings in your
          Home feed!
        </div>
      )}
    </div>
  );
}

export default YourClaims;
