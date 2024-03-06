import { ListGroup, Button, Card, Form, InputGroup } from "react-bootstrap";
import Claim from "./Claim";
import { useFormik } from "formik";
import * as Yup from "yup";

function ClaimsCard({
  listing,
  setSelectedListing,
  mine,
  handleEditListing,
  calculateRating,
}) {
  const claims = listing.claims
    .sort((a, b) => a.id - b.id)
    .map((claim) => (
      <Claim
        key={claim.id}
        claim={claim}
        mine={mine}
        setSelectedListing={setSelectedListing}
        handleEditListing={handleEditListing}
        calculateRating={calculateRating}
      ></Claim>
    ));

  const formik = useFormik({
    initialValues: { comment: "" },
    validationSchema: Yup.object({
      comment: Yup.string().required("Comment required"),
    }),
    onSubmit: (values, actions) => {
      const configObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, listing_id: listing.id }, null, 2),
      };
      fetch("/claims", configObj).then((r) => {
        if (r.ok) {
          r.json().then((listing) => {
            setSelectedListing(listing);
            handleEditListing(listing);
          });
        } else {
          console.log(r);
        }
      });
      actions.resetForm();
    },
  });
  return (
    <>
      <Card.Header>Claims</Card.Header>
      <Card.Body>
        <ListGroup id="claims">{claims}</ListGroup>
      </Card.Body>
      {mine ? null : (
        <Card.Footer>
          <Form onSubmit={formik.handleSubmit} className="add-claim-form">
            <InputGroup>
              <Form.Control
                as="textarea"
                placeholder="Add a claim..."
                {...formik.getFieldProps("comment")}
              />
              <InputGroup.Text className="add-claim-addon">
                <Button
                  type="submit"
                  className="add-claim-btn"
                  onSubmit={formik.handleSubmit}
                >
                  +Add
                </Button>
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </Card.Footer>
      )}
    </>
  );
}

export default ClaimsCard;
