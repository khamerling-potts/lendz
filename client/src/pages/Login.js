import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Login({ setCurrentUser }) {
  // const { setCurrentUser } = useOutletContext();
  return (
    <>
      <LoginForm setCurrentUser={setCurrentUser} />
      <SignupForm setCurrentUser={setCurrentUser} />
    </>
  );
}
export default Login;
