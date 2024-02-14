import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function LoginForm({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);

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
    fetch("/login", configObj).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        r.json().then((err) => setValid(false));
      }
    });
  }
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
      <form onSubmit={handleSubmit} id="loginForm">
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
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
export default LoginForm;
