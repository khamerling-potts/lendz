import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function YourClaims() {
  const { currentUser, listings } = useOutletContext();

  return <h1>Your Claims</h1>;
}

export default YourClaims;
