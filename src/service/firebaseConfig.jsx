// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsZdhNr5b0sLutptd_wFJ1Fpiqb4OPEqQ",
  authDomain: "first-project-d2ba2.firebaseapp.com",
  projectId: "first-project-d2ba2",
  storageBucket: "first-project-d2ba2.firebasestorage.app",
  messagingSenderId: "284874994644",
  appId: "1:284874994644:web:13e5efb81f36c0df73dc41",
  measurementId: "G-DN22N1VLNB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);