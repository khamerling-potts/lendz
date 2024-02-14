import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Login({ user, setUser }) {
  return (
    <>
      <LoginForm user={user} setUser={setUser} />
      <SignupForm user={user} setUser={setUser} />
    </>
  );
}
export default Login;
