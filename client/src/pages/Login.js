import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Login({ currentUser, setCurrentUser }) {
  return (
    <>
      <LoginForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <SignupForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </>
  );
}
export default Login;
