import { useState } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";

function Claim({ listing, claim, mine, handleEditListing }) {
  const [hover, setHover] = useState(false);
  const ratings = claim.user.ratings;
  const avg_rating = ratings
    ? ratings.reduce((acc, current) => acc + current, 0) / ratings.length
    : null;

  function onSelectClaim(e) {
    const configObj = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selected: true, action: "select" }),
    };
    fetch(`/claims/${claim.id}`, configObj).then((r) => {
      if (r.ok) {
        r.json().then((listing) => {
          handleEditListing(listing);
        });
      }
    });
  }

  return (
    <ListGroup.Item
      className={
        claim.selected
          ? "claim bg-info bg-opacity-10 border border-info rounded-end"
          : "claim"
      }
      onMouseOver={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
    >
      <Row>
        <Col xs={2}>
          {claim.user.username}
          <br />
          {avg_rating}
        </Col>
        <Col xs={6}>{claim.comment}</Col>
        <Col xs={4}>
          {claim.time}
          {hover && mine && !claim.selected ? (
            <Button id="select-claim>" onClick={onSelectClaim}>
              Select
            </Button>
          ) : null}
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default Claim;
