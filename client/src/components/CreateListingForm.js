import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";

function CreateListingForm({ handleCreateListing, setSelectedListing }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      img_url: "",
      description: "",
      zip: "",
      meeting_place: "",
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
    onSubmit: (values, { resetForm }) => {
      const configObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values, null, 2),
      };
      fetch(`/listings`, configObj).then((r) => {
        if (r.ok) {
          r.json().then((listing) => {
            handleCreateListing(listing);
            setSelectedListing(null);
          });
        }
      });
      resetForm();
    },
  });

  return (
    <div className=" createListingForm col-lg-6 col-sm-12">
      <Form
        onSubmit={formik.handleSubmit}
        className="row g-3"
        id="createListingForm"
      >
        <Form.Group className="col-md-3">
          <Form.Label className="mb-0 mt-2">*Title </Form.Label>
          <Form.Control
            className="form-control-sm"
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

        <Form.Group className="col-md-3">
          <Form.Label className="mb-0 mt-2">Image URL </Form.Label>
          <Form.Control
            className="form-control-sm"
            type="text"
            id="img_url"
            placeholder="Image URL"
            {...formik.getFieldProps("img_url")}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="col-md-3 form-group-sm">
          <Form.Label className="mb-0 mt-2">*Zip Code </Form.Label>
          <Form.Control
            className="form-control-sm"
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

        <Form.Group className="col-md-3">
          <Form.Label className="mb-0 mt-2">Meeting Place</Form.Label>
          <Form.Control
            className="form-control-sm"
            type="text"
            id="meeting_place"
            placeholder="Meeting Place"
            {...formik.getFieldProps("meeting_place")}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label className="mb-0">*Description</Form.Label>
          <Form.Control
            className="form-control-sm"
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

        <Button type="submit" className="post-listing-btn">
          Post
        </Button>
      </Form>
    </div>
  );
}

export default CreateListingForm;
