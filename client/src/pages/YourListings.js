import { useOutletContext } from "react-router-dom";
import Listing from "../components/Listing";
import CreateListingForm from "../components/CreateListingForm";
import { Button } from "react-bootstrap";
import ListingPreview from "../components/ListingPreview";

function YourListings() {
  const {
    currentUser,
    listings,
    selectedListing,
    setSelectedListing,
    handleEditListing,
    handleDeleteListing,
    handleCreateListing,
    requestListings,
  } = useOutletContext();
  const yourListings = listings.filter(
    (listing) => listing.user_id === currentUser.id
  );

  const listingsToDisplay = yourListings.map((listing) => (
    <ListingPreview
      key={listing.id}
      listing={listing}
      setSelectedListing={setSelectedListing}
      currentUser={currentUser}
      handleEditListing={handleEditListing}
      handleDeleteListing={handleDeleteListing}
      requestListings={requestListings}
    />
  ));

  return (
    <div className="page">
      <Button
        className="create-listing-btn"
        data-bs-toggle="collapse"
        data-bs-target="#create-listing-form"
        aria-expanded="false"
        aria-controls="create-listing-form"
      >
        Create Listing
      </Button>
      <div className="collapse" id="create-listing-form">
        <div className="create-listing-container">
          <CreateListingForm
            handleCreateListing={handleCreateListing}
            setSelectedListing={setSelectedListing}
          />
        </div>
      </div>

      {selectedListing ? (
        <Listing
          listing={selectedListing}
          setSelectedListing={setSelectedListing}
          currentUser={currentUser}
          handleEditListing={handleEditListing}
          handleDeleteListing={handleDeleteListing}
          requestListings={requestListings}
        />
      ) : listingsToDisplay.length ? (
        <>
          <h1>Your Listings</h1>
          <div className="preview-row row row-cols-lg-4 row-cols-md-2 row-cols-sm-1 g-4">
            {listingsToDisplay}
          </div>
        </>
      ) : (
        <div className="empty">
          You have not created any listings. Create one above?
        </div>
      )}
    </div>
  );
}

export default YourListings;
