import { auth, signInWithEmailAndPassword, collection, getDocs, db, onAuthStateChanged } from "./js/firebase.js";

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



const pageSpinner = document.getElementById("spinner-div");

const getAllRestaurants = async () => {
  const resList = document.getElementById("res-list")
  resList.innerHTML = ''
  const q = collection(db, "restaurant");
  let index = 0
  const querySnapshot = await getDocs(q);
  pageSpinner.style.display = "none"
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    resList.innerHTML += `
    <div class="col mb-4">
    <div class="card" style="width: 18rem">
    <img
    src="${doc.data().image}"
    class="card-img-top"
    alt="..."
    />
    <div class="card-body">
    <h5 class="card-title">${doc.data().name}</h5>
    
    <p class="card-text">All variety of biryani</p>
              <p>
              <span class="badge rounded-pill bg-warning">Biryani</span>
              <span class="badge rounded-pill bg-warning">Karahi</span>
                <span class="badge rounded-pill bg-warning">Drinks</span>
                </p>
                
                <a href="dishes.html?restaurant=${doc.id}" class="btn btn-primary">View all dishes</a>
                </div>
                </div>
                </div>
                `

  });
}


onAuthStateChanged(auth, (user) => {
  if ((user && location.pathname.indexOf("restaurants") !== -1) || (location.pathname === "/")) {
    getAllRestaurants()
  }

});
