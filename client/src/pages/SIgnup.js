import React from "react";
import { NavLink } from "react-router-dom";
import "./pages.css";

const Signup = () => {
  return (
    <div className="sign-up">
      <h1 className="sign-up__title">Sign Up</h1>
      <form className="sign-up__form">
        <input
          type="text"
          className="sign-up__form-entry"
          placeholder="Username"
          id="username"
        />
        <input
          type="email"
          className="sign-up__form-entry"
          placeholder="Email"
          id="email"
        />
        <input
          type="password"
          className="sign-up__form-entry"
          placeholder="Password"
          id="password"
        />
        <button className="signup__button">Sign up</button>
      </form>
      <div className="sign-up__extras">
        <p>Have an account?</p>
        <NavLink
          to="/sign-in"
          className="navlink"
        >
          <span>Sign in</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Signup;
