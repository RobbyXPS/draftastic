import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks = () => {
  return (
    <ul>
      <li id="nav-profile-btn">
        <NavLink to="/profile">RR</NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks;
