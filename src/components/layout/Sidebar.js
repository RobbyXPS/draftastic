import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <nav id="nav-side">
      <ul>
        <li>
          <NavLink to="/admin-tools">Admin tools</NavLink>
        </li>
        <li>
          <NavLink to="/team:id">My Team</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
