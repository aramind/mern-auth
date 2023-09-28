// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  apiKey: "AIzaSyAWouUokddVhYW5VNL6O_IH5fqhb1uRsCc",
  authDomain: "mern-auth-42abc.firebaseapp.com",
  projectId: "mern-auth-42abc",
  storageBucket: "mern-auth-42abc.appspot.com",
  messagingSenderId: "992290668581",
  appId: "1:992290668581:web:151badf35d44f8be9d7fcc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
