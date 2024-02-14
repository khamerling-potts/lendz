import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <h1>Project Client</h1>
      </header>
      <Outlet />
    </>
  );
}

export default App;
