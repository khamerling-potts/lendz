import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Login from "./pages/Login";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);

  // Automatically checks login when app loads, then requests listings if logged in
  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
          requestListings();
        });
      }
    });
  }, []);

  /* Request all listings from server */
  function requestListings() {
    console.log("browsing listings");
    return fetch("/listings").then((r) => {
      if (r.ok) {
        return r.json().then((listings) => {
          setListings(listings.sort((a, b) => a.id - b.id));
          return listings;
        });
      }
    });
  }

  // Updates listings with the newly edited listing, sorting by id to keep display order consistent
  function handleEditListing(editedListing) {
    let updatedListings = listings.filter(
      (listing) => listing.id !== editedListing.id
    );
    updatedListings.push(editedListing);
    setListings(updatedListings.sort((a, b) => a.id - b.id));
  }

  function handleDeleteListing(id) {
    const updatedListings = listings.filter((listing) => listing.id !== id);
    setListings(updatedListings);
  }

  function handleCreateListing(listing) {
    setListings([...listings, listing]);
  }

  return (
    <>
      <header>
        <NavBar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setSelectedListing={setSelectedListing}
        />
      </header>
      {currentUser ? (
        <Outlet
          context={{
            currentUser,
            setCurrentUser,
            selectedListing,
            setSelectedListing,
            listings,
            handleEditListing,
            handleDeleteListing,
            handleCreateListing,
            requestListings,
          }}
        />
      ) : (
        <Login setCurrentUser={setCurrentUser} />
      )}
    </>
  );
}

export default App;
