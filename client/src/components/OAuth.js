import React from "react";
import "./oAuth.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();

  const URL = "http://localhost:3001/api/auth/google";
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await axios.post(URL, {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      const data = await res.data;

      dispatch(signInSuccess(data));
      // console.log(data);
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="oauth__button"
      >
        Continue with Google
      </button>
    </>
  );
};

export default OAuth;
