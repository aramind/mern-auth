import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
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
          to="/profile"
          className="navlink"
        >
          {currentUser ? (
            <img
              src={currentUser.profilePicture}
              alt="profile"
              className="header__profile-pic"
            />
          ) : (
            <li>Sign In</li>
          )}
        </NavLink>
      </ul>
    </div>
  );
};

export default Header;
