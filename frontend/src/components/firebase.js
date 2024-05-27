// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDabnBM4S4NrVKGfCvOrlxjw9106Uj0AFs",
    authDomain: "login-auth-d49b7.firebaseapp.com",
    projectId: "login-auth-d49b7",
    storageBucket: "login-auth-d49b7.appspot.com",
    messagingSenderId: "591026262547",
    appId: "1:591026262547:web:df4e7859e41a38e256a5e6"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
console.log(db.collections, "db")
export default app;



