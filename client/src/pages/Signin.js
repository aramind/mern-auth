import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./pages.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const { loading, hasError, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const URL = "http://localhost:3001/api/auth/signin";
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post(URL, formData);

      setSuccessMsg(res.data.message);
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure());
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
        <OAuth />
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
