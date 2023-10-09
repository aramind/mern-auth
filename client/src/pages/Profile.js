import React from "react";
import "./pages.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <h1 className="profile">Profile</h1>
      <form className="profile__form">
        <img
          src={currentUser.profilePicture}
          alt="profile-picture"
          className="profile__picture"
        />
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="profile__input"
        />
        <input
          defaultValue={currentUser.email}
          type="text"
          id="email"
          placeholder="Email"
          className="profile__input"
        />
        <input
          type="text"
          id="password"
          placeholder="Password"
          className="profile__input"
        />
        <button className="profile__button profile__input">update</button>
        <div className="profile__actions">
          <span>Delete Account</span>
          <span>Sign Out</span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
