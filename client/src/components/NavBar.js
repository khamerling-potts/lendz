import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavBar({ currentUser, setCurrentUser, setSelectedListing }) {
  const navigate = useNavigate();
  function handleLogout(e) {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
        setSelectedListing(null);
        // navigate("/login");
      }
    });
  }
  if (currentUser) {
    return (
      <>
        <nav className="navbar navbar-expand-sm sticky-top bg-body-tertiary">
          <div className="logo">
            <img src="./lendzlogo.png" />
          </div>
          <div className="container-fluid justify-content-end">
            <span>Hi, {currentUser.username}</span>
            <button id="logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </nav>
        <nav className="navbar navbar-expand-sm sticky-top bg-body-tertiary">
          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              <div className="navbar-nav">
                <NavLink
                  to="/"
                  onClick={(e) => setSelectedListing(null)}
                  className="nav-link"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/yourclaims"
                  onClick={(e) => setSelectedListing(null)}
                  className="nav-link"
                >
                  Your Claims
                </NavLink>
                <NavLink
                  to="/yourlistings"
                  onClick={(e) => setSelectedListing(null)}
                  className="nav-link"
                >
                  Your Listings
                </NavLink>
              </div>
            </div>
          </div>

          {/* <span>Hi, {currentUser.username}</span>
          <NavLink id="logout" to="/login">
            Log Out
          </NavLink> */}
        </nav>
      </>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <div className="navbar-nav">
              <span className="navbar-brand">Lendz</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;

// return (
//   <nav className="navbar navbar-expand-sm sticky-top bg-body-tertiary">
//     <div className="container-fluid">
//       <div className="collapse navbar-collapse">
//         <div className="navbar-nav">
//           <NavLink
//             to="/"
//             onClick={(e) => setSelectedListing(null)}
//             className="nav-link"
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/yourclaims"
//             onClick={(e) => setSelectedListing(null)}
//             className="nav-link"
//           >
//             Your Claims
//           </NavLink>
//           <NavLink
//             to="/yourlistings"
//             onClick={(e) => setSelectedListing(null)}
//             className="nav-link"
//           >
//             Your Listings
//           </NavLink>
//         </div>
//       </div>
//     </div>
//     <div className="container-fluid justify-content-end">
//       <span>Hi, {currentUser.username}</span>
//       <button id="logout" onClick={handleLogout}>
//         Log Out
//       </button>
//     </div>
//     {/* <span>Hi, {currentUser.username}</span>
//           <NavLink id="logout" to="/login">
//             Log Out
//           </NavLink> */}
//   </nav>
// );
// } else {
// return (
//   <nav className="navbar navbar-expand-lg bg-body-tertiary">
//     <div className="container-fluid">
//       <div className="collapse navbar-collapse">
//         <div className="navbar-nav">
//           <span className="navbar-brand">Lendz</span>
//         </div>
//       </div>
//     </div>
//   </nav>
// );
