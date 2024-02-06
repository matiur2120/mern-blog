// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-6133c.firebaseapp.com",
  projectId: "mern-blog-6133c",
  storageBucket: "mern-blog-6133c.appspot.com",
  messagingSenderId: "959757269131",
  appId: "1:959757269131:web:261b3f11f8fc35603c7c8e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);