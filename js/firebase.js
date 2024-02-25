import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

export { auth, signInWithEmailAndPassword,onAuthStateChanged  }

