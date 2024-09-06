import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXBAM-_XeVWAlYcED12mYfxZCrArbTzY8",
  authDomain: "fitbitchallenge-2dfee.firebaseapp.com",
  projectId: "fitbitchallenge-2dfee",
  storageBucket: "fitbitchallenge-2dfee.appspot.com",
  messagingSenderId: "1048988428808",
  appId: "1:1048988428808:web:950bb96e268a2eac29ffbd",
  measurementId: "G-13R6H6MF66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig); //initialize firebase app 
module.exports = { firebase }; //export the app