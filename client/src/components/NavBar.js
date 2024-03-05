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
        <nav className="navbar top-nav navbar-expand-sm sticky-top ">
          <img
            src="https://github.com/khamerling-potts/lendz/blob/main/client/lendzlogo.png?raw=true"
            id="logo"
          />
          <div className="user-logout container-fluid justify-content-end">
            <span className="greeting">Hi, {currentUser.username}</span>
            <button id="logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </nav>
        <nav className="navbar bottom-nav navbar-expand-sm sticky-top">
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
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="navbar top-nav navbar-expand-sm sticky-top ">
          <img
            src="https://github.com/khamerling-potts/lendz/blob/main/client/lendzlogo.png?raw=true"
            id="logo"
          />
        </nav>
        <nav className="navbar bottom-nav navbar-expand-sm sticky-top">
          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              <div className="navbar-nav"></div>
            </div>
          </div>
        </nav>
      </>
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
