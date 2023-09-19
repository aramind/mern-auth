import React from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">Auth App</div>
      <ul className="header__navlinks">
        <NavLink
          to="/"
          className="navlink"
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          to="/about"
          className="navlink"
        >
          <li>About</li>
        </NavLink>
        <NavLink
          to="/sign-in"
          className="navlink"
        >
          <li>Sign In</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Header;
