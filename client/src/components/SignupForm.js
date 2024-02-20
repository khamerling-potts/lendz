import { useState, useEffect } from "react";
import { useFetcher, useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignupForm({ currentUser, setCurrentUser }) {
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
      fetch("/signup", configObj).then((r) => {
        if (r.ok) {
          r.json().then((user) => setCurrentUser(user));
        } else {
          r.json().then((err) => console.log(err));
        }
      });
    },
  });
  return (
    <div>
      <label htmlFor="signupForm">Or Sign Up below:</label>
      <form onSubmit={formik.handleSubmit} id="signupForm">
        <input
          type="text"
          id="username"
          placeholder="username"
          onChange={handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        ></input>
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
        {usernameTaken && formik.values.username != "" ? (
          <div id="usernameTaken">Username taken ✕</div>
        ) : null}
        {!usernameTaken && formik.values.username != "" ? (
          <div id="usernameAvailable">Username available ✔</div>
        ) : null}
        <input
          type="text"
          id="password"
          placeholder="password"
          {...formik.getFieldProps("password")}
        ></input>
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
export default SignupForm;
