// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "apna-bazar-96272.firebaseapp.com",
  projectId: "apna-bazar-96272",
  storageBucket: "apna-bazar-96272.firebasestorage.app",
  messagingSenderId: "160714930438",
  appId: "1:160714930438:web:62687cb7282ae7f89d4687",
  measurementId: "G-NXSM3KE770"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}