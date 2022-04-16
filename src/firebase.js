// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbnvCqslYa3R4Apq9rR-b923HkgCP-C6A",
  authDomain: "blog-68ac0.firebaseapp.com",
  projectId: "blog-68ac0",
  storageBucket: "blog-68ac0.appspot.com",
  messagingSenderId: "260345100665",
  appId: "1:260345100665:web:5859eeda661f16835997a8",
  measurementId: "G-1ME8919X8T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
