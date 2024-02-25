import { auth, signInWithEmailAndPassword } from "./firebase.js";

const login = () => {
    const email = document.getElementById("email")
    const password = document.getElementById("password")

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            if (user.email === "admin@gmail.com") {
                location = "dashboard.html"
            }
            else {

            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error: ${errorCode}`);
            console.log(`Error Message: ${errorMessage}`);
        });
}

const loginBtn = document.getElementById("loginBtn")

loginBtn && loginBtn.addEventListener("click", login)