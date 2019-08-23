import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="myheader">
      <nav>
        <ul>
          <li id="nav-basketball-icon">
            <i class="fas fa-basketball-ball" />
          </li>
          <li id="nav-signin-btn">
            <NavLink to="/signin" id="snb">
              Sign In
            </NavLink>
          </li>
          <li id="nav-signup-btn">
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
