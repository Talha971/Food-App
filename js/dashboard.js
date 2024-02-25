import { auth, onAuthStateChanged } from "./firebase.js";
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        if (user.email !== "admin@gmail.com") {
            location.href = "login.html"
        }
        console.log(user.email);
    }

    else {
        location.href = "login.html"
    }
});