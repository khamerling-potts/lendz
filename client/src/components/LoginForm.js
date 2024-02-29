import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function LoginForm({ currentUser, setCurrentUser }) {
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

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
      fetch("/login", configObj).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setCurrentUser(user);
            navigate("/");
          });
        } else {
          r.json().then((err) => setValid(false));
        }
      });
    },
  });

  return (
    <div>
      <label htmlFor="loginForm" id="loginLabel">
        Already have an account? Log In:
      </label>
      {valid ? (
        <></>
      ) : (
        <label htmlFor="loginForm" id="invalidLogin">
          Invalid username or password
        </label>
      )}
      <form onSubmit={formik.handleSubmit} id="loginForm">
        <input
          type="text"
          id="username"
          placeholder="username"
          {...formik.getFieldProps("username")}
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
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
export default LoginForm;
