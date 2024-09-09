// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "primeproperties-estate.firebaseapp.com",
  projectId: "primeproperties-estate",
  storageBucket: "primeproperties-estate.appspot.com",
  messagingSenderId: "853504951224",
  appId: "1:853504951224:web:f52dde529275c8c5e4c54d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);