// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuqnZWjMwR1KgpQP-00hIxu0UolERraPo",
  authDomain: "d-aluguel.firebaseapp.com",
  projectId: "d-aluguel",
  storageBucket: "d-aluguel.appspot.com",
  messagingSenderId: "239044836735",
  appId: "1:239044836735:web:ae14f0512c41b25bd32e4a",
  measurementId: "G-PF293YZ0SP"
};


firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();