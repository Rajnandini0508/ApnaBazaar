// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "apnabazaar-6c6c8.firebaseapp.com",
  projectId: "apnabazaar-6c6c8",
  storageBucket: "apnabazaar-6c6c8.firebasestorage.app",
  messagingSenderId: "611193321808",
  appId: "1:611193321808:web:7ff78c6d9c50881577d455"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}