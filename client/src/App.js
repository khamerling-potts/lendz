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

  // When app loads, request all database listings (to be displayed in nested routes)
  //sometimes this useeffect doesn't trigger. is it bc of the one above?
  useEffect(() => {
    console.log("browsing listings");
    fetch("/browse_listings").then((r) => {
      if (r.ok)
        r.json().then((listings) => {
          setListings(listings);
        });
    });
  }, []);

  function handleEditListing(editedListing) {
    const editedListings = listings.filter(
      (listing) => listing.id !== editedListing.id
    );
    setListings([...editedListings, editedListing]);
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
          }}
        />
      ) : (
        <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}
    </>
  );
}

export default App;
