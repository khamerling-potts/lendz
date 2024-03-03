import { Card } from "react-bootstrap";

function RateHeader({
  userToRate,
  listingID,
  setSelectedListing,
  requestListings,
}) {
  function onRating(rating) {
    const configObj = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: rating }),
    };
    fetch(`/users/${userToRate.id}`, configObj).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          requestListings().then((listings) =>
            setSelectedListing(
              listings.find((listing) => listing.id === listingID)
            )
          );
        });
      }
    });
  }
  return (
    <Card.Header className="d-flex align-items-center justify-content-between">
      <h6 className="mb-0">
        Handoff complete? Rate {userToRate.username} now!
      </h6>
      <span className="rating">
        <i className="fa-solid fa-star" onClick={(e) => onRating(1)}></i>
        <i className="fa-solid fa-star" onClick={(e) => onRating(2)}></i>
        <i className="fa-solid fa-star" onClick={(e) => onRating(3)}></i>
        <i className="fa-solid fa-star" onClick={(e) => onRating(4)}></i>
        <i className="fa-solid fa-star" onClick={(e) => onRating(5)}></i>
      </span>
    </Card.Header>
  );
}

export default RateHeader;
