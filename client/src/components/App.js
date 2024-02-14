import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
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
        r.json().then((user) => console.log(user));
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  return (
    <>
      <h1>Project Client</h1>
      <form onSubmit={handleSubmit}>
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
    </>
  );
}

export default App;
