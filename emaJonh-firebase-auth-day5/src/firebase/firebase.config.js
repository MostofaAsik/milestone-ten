// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDL1D7YTIwn3oPZDetzgqUl3J8QvGcB9Nw",
    authDomain: "emajhon-firabse-auth.firebaseapp.com",
    projectId: "emajhon-firabse-auth",
    storageBucket: "emajhon-firabse-auth.appspot.com",
    messagingSenderId: "519666084702",
    appId: "1:519666084702:web:e8ae01c6824de9a80b3dcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;