import { ListGroup, Button, Card } from "react-bootstrap";
import Claim from "./Claim";

function ClaimsFooter({ listing, mine }) {
  const claims = listing.claims.map((claim) => (
    <Claim key={claim.id} claim={claim} mine={mine}></Claim>
  ));
  return (
    <Card.Footer>
      {mine ? <div>Select a claim below</div> : <Button>Add claim</Button>}
      <ListGroup>{claims}</ListGroup>
    </Card.Footer>
  );
}

export default ClaimsFooter;
