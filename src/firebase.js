// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwZHElsxTZn4IO_Ihik9x-54EP2sdJQEc",
  authDomain: "portfolio-c1956.firebaseapp.com",
  projectId: "portfolio-c1956",
  storageBucket: "portfolio-c1956.firebasestorage.app",
  messagingSenderId: "87957258193",
  appId: "1:87957258193:web:98e2353099f6be39ba6af0",
  measurementId: "G-XVCTM58JTD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
