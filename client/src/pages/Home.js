import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Listing from "../components/Listing";

function Home() {
  //const [listings, setListings] = useState([]);
  const {
    currentUser,
    listings,
    //updateListings,
    handleEditListing,
    handleDeleteListing,
    requestListings,
  } = useOutletContext();

  useEffect(() => {
    requestListings();
  }, []);

  /* Request all listings from server */
  // function requestListings() {
  //   console.log("browsing listings");
  //   fetch("/listings").then((r) => {
  //     if (r.ok)
  //       r.json().then((listings) => {
  //         setListings(listings.sort((a, b) => a.id - b.id));
  //       });
  //   });
  // }

  // function handleEditListing(listing) {
  //   const updatedListings = updateListings(listings, "edit", listing);
  //   setListings(updatedListings);
  // }

  // function handleDeleteListing(id) {
  //   const updatedListings = updateListings(listings, "delete", null, id);
  //   setListings(updatedListings);
  // }

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

  // Updates listings with the newly edited listing, sorting by id to keep display order consistent
  // function handleEditListing(editedListing) {
  //   let editedListings = listings.filter(
  //     (listing) => listing.id !== editedListing.id
  //   );
  //   editedListings.push(editedListing);
  //   setListings(editedListings.sort((a, b) => a.id - b.id));
  // }

  // function handleDeleteListing(id) {
  //   const updatedListings = listings.filter((listing) => listing.id !== id);
  //   setListings(updatedListings);
  // }
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
