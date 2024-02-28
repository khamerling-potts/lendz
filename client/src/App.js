import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Login from "./pages/Login";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  // Automatically checks login when app loads
  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

  // When app loads, request all listings (to be displayed in nested routes)
  useEffect(() => {
    requestListings();
  }, []);

  /* Request all listings from server */
  function requestListings() {
    console.log("browsing listings");
    fetch("/listings").then((r) => {
      if (r.ok)
        r.json().then((listings) => {
          setListings(listings.sort((a, b) => a.id - b.id));
        });
    });
  }

  // Updates listings with the newly edited listing, sorting by id to keep display order consistent
  function handleEditListing(editedListing) {
    let editedListings = listings.filter(
      (listing) => listing.id !== editedListing.id
    );
    editedListings.push(editedListing);
    setListings(editedListings.sort((a, b) => a.id - b.id));
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
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </header>
      {currentUser ? (
        <Outlet
          context={{
            currentUser,
            listings,
            handleEditListing,
            handleDeleteListing,
            handleCreateListing,
            requestListings,
          }}
        />
      ) : (
        <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}
    </>
  );
}

export default App;
