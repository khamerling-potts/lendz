import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <Outlet />
    </>
  );
}

export default App;
