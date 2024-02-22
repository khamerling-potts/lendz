import { ListGroup, Button, Card, Form } from "react-bootstrap";
import Claim from "./Claim";
import { useFormik } from "formik";
import * as Yup from "yup";

function ClaimsFooter({ listing, mine, handleEditListing }) {
  const claims = listing.claims.map((claim) => (
    <Claim key={claim.id} claim={claim} mine={mine}></Claim>
  ));

  const formik = useFormik({
    initialValues: { comment: "" },
    validationSchema: Yup.object({
      comment: Yup.string().required("Comment required"),
    }),
    onSubmit: (values) => {
      const configObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values, null, 2),
      };
      fetch("/create_claim", configObj).then((r) => {
        if (r.ok) {
          r.json().then((listing) => handleEditListing(listing));
        }
      });
    },
  });
  return (
    <Card.Footer>
      <ListGroup className="overflow-auto">{claims}</ListGroup>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Control
            as="textarea"
            placeholder="Add a claim..."
            {...formik.getFieldProps("comment")}
          />
          <Button type="submit">+Add</Button>
        </Form.Group>
      </Form>
    </Card.Footer>
  );
}

export default ClaimsFooter;
