import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Automatically checks login
  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <>
      <header>
        <NavBar user={user} setUser={setUser} />
      </header>
      {user ? <Outlet /> : <Login user={user} setUser={setUser} />}
    </>
  );
}

export default App;
