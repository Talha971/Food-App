import {
    auth,
    createUserWithEmailAndPassword,

} from "./firebase.js";




// signup
function register() {

    ////////////////////////////// EMAIL AND PASSWORD /////////////////////////////////////

    const getPass = document.getElementById("password");
    const getEmail = document.getElementById("email");
    console.log(getPass.value, getEmail.value);

    // for signup
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user-->", user);
            window.location = "./login.html"

        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error", errorMessage);
        });
}
let registerBtn = document.getElementById("registerBtn")
registerBtn.addEventListener("click", register)