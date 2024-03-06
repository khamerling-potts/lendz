import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";

function EditListingForm({
  listing,
  setSelectedListing,
  handleEditListing,
  setShowPopover,
}) {
  const formik = useFormik({
    initialValues: {
      title: listing.title,
      img_url: listing.img_url,
      description: listing.description,
      zip: listing.zip,
      meeting_place: listing.meeting_place,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title required")
        .test(
          "len",
          "Must be 50 characters or less",
          (value) => value.length <= 50
        ),
      description: Yup.string()
        .required("Description required")
        .test(
          "len",
          "Must be 100 characters or less",
          (value) => value.length <= 100
        ),
      zip: Yup.number()
        .integer()
        .positive()
        .typeError("Must be a number")
        .min(10000, "Please enter a 5-digit zip code")
        .max(99999, "Please enter a 5-digit zip code")
        .required("Zip code required"),
    }),
    onSubmit: (values) => {
      const configObj = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values, null, 2),
      };
      fetch(`/listings/${listing.id}`, configObj).then((r) => {
        if (r.ok) {
          r.json().then((listing) => {
            setSelectedListing(listing);
            handleEditListing(listing);
            setShowPopover(false);
          });
        }
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} id="editListingForm">
      <Form.Group>
        <Form.Label className="mb-0 mt-2">*Title </Form.Label>
        <Form.Control
          type="text"
          id="title"
          placeholder="Enter title here..."
          {...formik.getFieldProps("title")}
        ></Form.Control>
        {formik.touched.title && formik.errors.title ? (
          <Form.Text className="validation text-small">
            {formik.errors.title}
          </Form.Text>
        ) : null}
      </Form.Group>

      <Form.Group>
        <Form.Label className="mb-0 mt-2">Image URL </Form.Label>
        <Form.Control
          type="text"
          id="img_url"
          placeholder="Image URL"
          {...formik.getFieldProps("img_url")}
        ></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label className="mb-0 mt-2">*Zip Code </Form.Label>
        <Form.Control
          type="number"
          id="zip"
          placeholder="Enter zip code here..."
          {...formik.getFieldProps("zip")}
        ></Form.Control>
        {formik.touched.zip && formik.errors.zip ? (
          <Form.Text className="validation text-small">
            {formik.errors.zip}
          </Form.Text>
        ) : null}
      </Form.Group>

      <Form.Group>
        <Form.Label className="mb-0 mt-2">Meeting Place</Form.Label>
        <Form.Control
          type="text"
          id="meeting_place"
          placeholder="Meeting Place"
          {...formik.getFieldProps("meeting_place")}
        ></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label className="mb-0">*Description</Form.Label>
        <Form.Control
          as="textarea"
          id="description"
          placeholder="Enter description here..."
          {...formik.getFieldProps("description")}
        ></Form.Control>
        {formik.touched.description && formik.errors.description ? (
          <Form.Text className="validation text-small">
            {formik.errors.description}
          </Form.Text>
        ) : null}
      </Form.Group>

      <Button type="submit" className="submit-btn">
        Save
      </Button>
    </Form>
  );
}

export default EditListingForm;
