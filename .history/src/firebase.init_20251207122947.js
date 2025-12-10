// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrKXbKUJAEdDUMf2qZdsnZSa29QVLqnMc",
    authDomain: "garments-tracker-6d930.firebaseapp.com",
    projectId: "garments-tracker-6d930",
    storageBucket: "garments-tracker-6d930.firebasestorage.app",
    messagingSenderId: "971225374608",
    appId: "1:971225374608:web:0b1632ed99e4b183269d15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);