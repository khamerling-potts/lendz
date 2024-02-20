import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Listing from "../components/Listing";

function Home() {
  const [listings, setListings] = useState([]);
  const { currentUser } = useOutletContext();

  // When Home page loads, request all browseable listings to be displayed
  useEffect(() => {
    fetch("/browse_listings").then((r) => {
      if (r.ok) r.json().then((listings) => setListings(listings));
    });
  }, []);

  const listings_to_display = listings.map((listing) => (
    <Listing key={listing.id} listing={listing} currentUser={currentUser} />
  ));

  return (
    <div>
      <h1>Home</h1>
      <div className="container">
        <div className="row justify-content-evenly">{listings_to_display}</div>
      </div>
    </div>
  );
}
export default Home;
