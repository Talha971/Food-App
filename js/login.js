import { auth, signInWithEmailAndPassword } from "./firebase.js";
function signin() {
    const getPass = document.getElementById("password");
    const getEmail = document.getElementById("email");
    console.log(getPass.value, getEmail.value);

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user-->", user);
            window.location = "http://127.0.0.1:5500/"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error", errorMessage);
        });
};
document.getElementById("loginBtn").addEventListener("click", signin)
