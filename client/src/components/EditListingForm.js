import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";

function EditListingForm({ listing, handleEditListing, setShowPopover }) {
  const formik = useFormik({
    initialValues: {
      title: listing.title,
      img_url: listing.img_url,
      description: listing.description,
      zip: listing.zip,
      meeting_place: listing.meeting_place,
    },
    validationScheme: Yup.object({
      title: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Title required"),
      description: Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("Description required"),
      zip: Yup.number()
        .integer()
        .positive()
        .typeError("Must be a number")
        .min(10000, "Please enter a 5-digit zip code")
        .max(99999, "Please enter a 5-digit zip code"),
    }),
    onSubmit: (values) => {
      const configObj = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values, null, 2),
      };
      fetch(`/listings/${listing.id}`, configObj).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            handleEditListing(data);
            setShowPopover(false);
          });
        }
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label>Title*</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps("title")}
        ></Form.Control>
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps("img_url")}
        ></Form.Control>
        <Form.Label>Description*</Form.Label>
        <Form.Control
          as="textarea"
          {...formik.getFieldProps("description")}
        ></Form.Control>
        <Form.Label>Zip Code*</Form.Label>
        <Form.Control
          type="number"
          {...formik.getFieldProps("zip")}
        ></Form.Control>
        <Form.Label>Meeting Place</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps("meeting_place")}
        ></Form.Control>
        <Button type="submit">Save</Button>
      </Form.Group>
    </Form>
  );
}

export default EditListingForm;
