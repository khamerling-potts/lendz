import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Login({ setCurrentUser }) {
  // const { setCurrentUser } = useOutletContext();
  return (
    <div className="page container row row-cols-md-2 row-cols-sm-1">
      <LoginForm setCurrentUser={setCurrentUser} />
      <SignupForm setCurrentUser={setCurrentUser} />
    </div>
  );
}
export default Login;
