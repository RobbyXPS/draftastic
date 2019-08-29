import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul>
      <li className="nav-btn" id="nav-signin-btn">
        <NavLink to="/signin">Sign In</NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
