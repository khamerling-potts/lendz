import { NavLink } from "react-router-dom";
function NavBar({ currentUser, setCurrentUser }) {
  function handleLogout(e) {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) setCurrentUser(null);
    });
  }
  if (currentUser) {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <div className="navbar-nav">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/yourclaims" className="nav-link">
                Your Claims
              </NavLink>
              <NavLink to="/yourlistings" className="nav-link">
                Your Listings
              </NavLink>
            </div>
          </div>
        </div>
        <div className="container-fluid justify-content-end">
          <span>Hi, {currentUser.username}</span>
          <button id="logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>
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
