import { ListGroup, Button, Card } from "react-bootstrap";

function ClaimsFooter({ listing, currentUser }) {
  const claims = listing.claims.map((claim) => (
    <ListGroup.Item key={claim.id}>{claim.comment}</ListGroup.Item>
  ));
  return (
    <Card.Footer>
      {listing.user.username === currentUser.username ? (
        <div>Select a claim below</div>
      ) : (
        <Button>Add claim</Button>
      )}
      <ListGroup>{claims}</ListGroup>
    </Card.Footer>
  );
}

export default ClaimsFooter;
