import { NavLink } from "react-router-dom";
function NavBar() {
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
    </nav>
  );
}

export default NavBar;
