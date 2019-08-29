import React from "react";
import { NavLink } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Navbar = () => {
  return (
    <header className="myheader">
      <nav>
        <div id="nav-basketball-icon">
          <NavLink to="/" id="snb">
            <i className="fas fa-basketball-ball" />
          </NavLink>
        </div>
        <SignedOutLinks />
        <SignedInLinks />
      </nav>
    </header>
  );
};

export default Navbar;
