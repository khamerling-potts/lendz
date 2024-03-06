import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";

function SignupForm({ setCurrentUser }) {
  const [usernameTaken, setUsernameTaken] = useState(false);

  function handleChange(e) {
    formik.handleChange(e);
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: e.target.value }),
    };
    fetch("/check_username", configObj).then((r) => {
      if (r.ok) {
        r.json().then((data) => setUsernameTaken(false));
      } else {
        r.json().then((err) => setUsernameTaken(true));
      }
    });
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values) => {
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      };
      fetch("/users", configObj).then((r) => {
        if (r.ok) {
          r.json().then((user) => setCurrentUser(user));
        } else {
          r.json().then((err) => console.log(err));
        }
      });
    },
  });
  return (
    <div className="signupForm">
      <Form.Label
        htmlFor="signupForm"
        id="signupLabel"
        className="form-label-lg"
      >
        Sign Up:
      </Form.Label>
      <Form onSubmit={formik.handleSubmit} id="signupForm">
        <Form.Group>
          <Form.Control
            className="form-control-lg"
            type="text"
            id="username"
            placeholder="username"
            onChange={handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          ></Form.Control>
          {formik.touched.username && formik.errors.username ? (
            <Form.Text className="validation text-small">
              {formik.errors.username}
            </Form.Text>
          ) : null}
          {usernameTaken && formik.values.username !== "" ? (
            <Form.Text id="usernameTaken">Username taken ✕</Form.Text>
          ) : null}
          {!usernameTaken && formik.values.username !== "" ? (
            <Form.Text id="usernameAvailable">Username available ✔</Form.Text>
          ) : (
            <br />
          )}
        </Form.Group>

        <Form.Group>
          <Form.Control
            className="form-control-lg"
            type="text"
            id="password"
            placeholder="password"
            {...formik.getFieldProps("password")}
          ></Form.Control>
          {formik.touched.password && formik.errors.password ? (
            <Form.Text className="validation text-small">
              {formik.errors.password}
            </Form.Text>
          ) : (
            <br />
          )}
        </Form.Group>

        <Button type="submit" className="submit-btn">
          Sign up
        </Button>
      </Form>
    </div>
  );
}
export default SignupForm;
