// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXKbx634X3Q8dcMiXjHseVzQiAFMvmSdY",
  authDomain: "reputa360.firebaseapp.com",
  projectId: "reputa360",
  storageBucket: "reputa360.appspot.com",
  messagingSenderId: "37758184858",
  appId: "1:37758184858:web:1d40d66b1441f2bf6f9e23",
  measurementId: "G-9MR1JLWZ81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);