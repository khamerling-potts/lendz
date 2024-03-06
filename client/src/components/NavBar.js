import { NavLink } from "react-router-dom";

function NavBar({ currentUser, setCurrentUser, setSelectedListing }) {
  function handleLogout(e) {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
        setSelectedListing(null);
      }
    });
  }
  if (currentUser) {
    return (
      <>
        <nav className="navbar top-nav navbar-expand-sm sticky-top ">
          <img
            alt="logo"
            src="https://github.com/khamerling-potts/lendz/blob/main/client/lendzlogo.png?raw=true"
            id="logo"
          />
          <div className="user-logout container-fluid justify-content-end">
            <span className="greeting">
              Hi, <span id="greeting-user">{currentUser.username}</span>
            </span>
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
            alt="logo"
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
