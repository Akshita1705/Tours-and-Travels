// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZy2wWhe6fVamE4j63AyjP3u38gH7CUfo",
  authDomain: "travels-4d51a.firebaseapp.com",
  projectId: "travels-4d51a",
  storageBucket: "travels-4d51a.firebasestorage.app",
  messagingSenderId: "723753018825",
  appId: "1:723753018825:web:3676bd4affeb04d724f418"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };