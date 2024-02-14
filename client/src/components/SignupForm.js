import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function SignupForm({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    fetch("/signup", configObj).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }
  return (
    <div>
      <label htmlFor="signupForm">Or Sign Up below:</label>

      <form onSubmit={handleSubmit} id="signupForm">
        <input
          type="text"
          value={username}
          id="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="text"
          value={password}
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
export default SignupForm;
