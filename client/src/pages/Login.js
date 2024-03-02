import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Login({ setCurrentUser }) {
  // const { setCurrentUser } = useOutletContext();
  return (
    <div className="loginPage">
      <div className=" loginForms row row-cols-md-3 row-cols-sm-1">
        <LoginForm setCurrentUser={setCurrentUser} />
        <SignupForm setCurrentUser={setCurrentUser} />
      </div>
    </div>
  );
}
export default Login;
