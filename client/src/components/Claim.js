import { useState } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";

function Claim({ listing, claim, mine }) {
  const [hover, setHover] = useState(false);
  return (
    <ListGroup.Item
      className="claim"
      onMouseOver={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
    >
      <Row>
        <Col xs={2}>{claim.user.username}</Col>
        <Col xs={6}>{claim.comment}</Col>
        <Col xs={4}>
          {claim.time}
          {hover ? <Button id="select-claim>">Select</Button> : null}
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default Claim;
