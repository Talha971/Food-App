import { collection, getDocs, db, where, query } from "./firebase.js";

const getAllDishes = async () => {
    var urlParams = new URLSearchParams(window.location.search);
    const allDishes = document.getElementById("all-dishes");
    const q = query(collection(db, "dishes"), where('restaurant', '==', urlParams.get('restaurant')));
    const querySnapshot = await getDocs(q);
    allDishes.innerHTML = ``
    querySnapshot.forEach((doc) => {

        console.log(doc.id, " => ", doc.data());
        allDishes.innerHTML += `
        <div class="card dish-card w-100 mb-3">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <img class="dish-img" src="${doc.data().image}" alt="" />
              <div class="p-2">
                <h5 class="card-title">${doc.data().name}</h5>
                <h3 class="card-title">Rs ${doc.data().price} /-</h3>
                <p class="card-text">serves ${doc.data().serving}</p>
              </div>
            </div>

            <div class="d-flex align-items-center gap-2">
              <button class="qty-btn">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="fw-bold">1</span>
              <button class="qty-btn">
                <i class="fa-solid fa-plus"></i>
              </button>

              <a href="#" class="btn btn-primary">Add To Cart</a>
            </div>
          </div>
        </div>
      </div>
`
    });
}
getAllDishes()