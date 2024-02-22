import { ListGroup, Row, Col } from "react-bootstrap";

function Claim({ listing, claim, mine }) {
  return (
    <ListGroup.Item>
      <Row>
        <Col>{claim.user.username}</Col>
        <Col>{claim.comment}</Col>
        <Col>{claim.time}</Col>
      </Row>
    </ListGroup.Item>
  );
}

export default Claim;
