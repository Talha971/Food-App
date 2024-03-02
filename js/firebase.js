import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

import { getFirestore, addDoc, collection, query, where, getDocs, getDoc, doc, serverTimestamp, updateDoc } from
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDzUSEKlSr9Mx2dhqTSOWgGLXrJjcHEovs",
    authDomain: "food-app-36fc6.firebaseapp.com",
    projectId: "food-app-36fc6",
    storageBucket: "food-app-36fc6.appspot.com",
    messagingSenderId: "223930728787",
    appId: "1:223930728787:web:3ec27124659efe15fde1a6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);



export {
    auth, signInWithEmailAndPassword,createUserWithEmailAndPassword, onAuthStateChanged,
    storage, ref, uploadBytesResumable, getDownloadURL,
    db, collection, addDoc, query, where, getDocs, getDoc, doc, serverTimestamp, updateDoc
}


