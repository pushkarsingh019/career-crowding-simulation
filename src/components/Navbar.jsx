import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isAdmin }) {
  return (
    <div className="navbar">
      <nav className="nav-list">
        <li>
          <Link className="link" to={`/choice`}>
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to={`/simulation`}>
            Simulation
          </Link>
        </li>
        {isAdmin ? (
          <li>
            <Link className="link" to={`/admin`}>
              Admin
            </Link>
          </li>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
}

export default Navbar;
