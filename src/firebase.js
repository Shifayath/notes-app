// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARplLLjPVYYllhV7vQfP4IZYkTtbHz4hw",
  authDomain: "fir-notes-app-2d1d3.firebaseapp.com",
  projectId: "fir-notes-app-2d1d3",
  storageBucket: "fir-notes-app-2d1d3.firebasestorage.app",
  messagingSenderId: "554058103542",
  appId: "1:554058103542:web:3cab15d7769600ebca8ad7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
