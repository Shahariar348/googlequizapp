import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore,collection,doc, addDoc,getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD7R7t6D-toQYCeM0bqLr1Pi_X6zBs8jvU",
    authDomain: "more-8a2ac.firebaseapp.com",
    projectId: "more-8a2ac",
    storageBucket: "more-8a2ac.appspot.com",
    messagingSenderId: "192099314813",
    appId: "1:192099314813:web:f8a066f22c05374723d514",
    measurementId: "G-DS625SP03Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dataBase=getFirestore(app)