import { useState, useEffect } from "react";
import { useFetcher, useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignupForm({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     const configObj = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username,
  //         password,
  //       }),
  //     };
  //     fetch("/signup", configObj).then((r) => {
  //       if (r.ok) {
  //         r.json().then((user) => setUser(user));
  //       } else {
  //         r.json().then((err) => console.log(err));
  //       }
  //     });
  //   }

  function handleChange(e) {}

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
          r.json().then((user) => setUser(user));
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
