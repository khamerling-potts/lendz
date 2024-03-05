import { useState } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";

function Claim({
  listing,
  setSelectedListing,
  claim,
  mine,
  handleEditListing,
  calculateRating,
  setSelectedlisting,
}) {
  const [hover, setHover] = useState(false);
  const ratings = claim.user.ratings;

  function onSelectClaim(e) {
    const configObj = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selected: true, action: "select" }),
    };
    fetch(`/claims/${claim.id}`, configObj).then((r) => {
      if (r.ok) {
        r.json().then((listing) => {
          setSelectedListing(listing);
          handleEditListing(listing);
        });
      }
    });
  }

  return (
    <ListGroup.Item
      className={claim.selected ? "claim selected" : "claim not-selected"}
      onMouseOver={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
    >
      <Row>
        <Col xs={2} className="claim-info claim-user">
          <div>
            <span className="claim-user">{claim.user.username} </span>
            <span className="user-rating badge">
              {calculateRating(claim.user)} <i className="fa-solid fa-star"></i>
            </span>
          </div>
        </Col>
        <Col xs={6} className="claim-info">
          {claim.comment}
        </Col>
        <Col xs={4} className="claim-info">
          {claim.time}
          {hover && mine && !claim.selected ? (
            <Button className="select-claim-btn" onClick={onSelectClaim}>
              Select
            </Button>
          ) : null}
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default Claim;
