import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./pages.css";
import axios from "axios";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const URL = "http://localhost:3001/api/auth/signin";
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(URL, formData);
      setLoading(false);
      setSuccessMsg(res.data.message);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setHasError(true);
      console.log(error.response.data.message);
      setErrorMsg(`Sign up failed, ${error.response.data.message}`);
    }

    setTimeout(() => {
      setErrorMsg("");
      setSuccessMsg("");
    }, 3000);
  };
  // console.log(formData);
  return (
    <div className="sign-up">
      <h1 className="sign-up__title">Sign In</h1>
      <form
        className="sign-up__form"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          className="sign-up__form-entry"
          placeholder="Email"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          className="sign-up__form-entry"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button
          className="signup__button"
          disabled={loading}
        >
          {loading ? "Loading" : "Sign In"}
        </button>
      </form>
      <div className="sign-up__extras">
        <p>Don't have an account?</p>
        <NavLink
          to="/sign-up"
          className="navlink"
        >
          <span>Sign up</span>
        </NavLink>
      </div>
      {hasError && <p className="error-msg">{errorMsg}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}
    </div>
  );
};

export default Signin;
