import { useOutletContext } from "react-router-dom";
import Listing from "../components/Listing";
import ListingPreview from "../components/ListingPreview";

function Home() {
  const {
    currentUser,
    listings,
    selectedListing,
    setSelectedListing,
    handleEditListing,
    handleDeleteListing,
    requestListings,
  } = useOutletContext();

  const listingsToDisplay = listings.map((listing) => (
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
      {selectedListing ? (
        <Listing
          listing={selectedListing}
          setSelectedListing={setSelectedListing}
          currentUser={currentUser}
          handleEditListing={handleEditListing}
          handleDeleteListing={handleDeleteListing}
          requestListings={requestListings}
        />
      ) : (
        <>
          <h1>Browse Listings</h1>
          <div className="preview-row row row-cols-lg-4 row-cols-md-2 row-cols-sm-1 g-4">
            {listingsToDisplay}
          </div>
        </>
      )}
    </div>
  );
}
export default Home;
