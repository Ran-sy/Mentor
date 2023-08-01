// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxcgCKtGoEMJVwfCjm4bktts-GJeCBAxM",
  authDomain: "firstproject-36d20.firebaseapp.com",
  projectId: "firstproject-36d20",
  storageBucket: "firstproject-36d20.appspot.com",
  messagingSenderId: "119259830827",
  appId: "1:119259830827:web:4fd9e88810cad9a389a86e",
  measurementId: "G-6B5FKF0V8R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
