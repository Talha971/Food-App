import { collection, getDocs, db, where, query, getDoc, doc } from "./firebase.js";

var urlParams = new URLSearchParams(window.location.search);
let pageSpinner = document.getElementById("spinner-div")
let mainContent = document.getElementById("main-content")

const getRestaurantDetail = async () => {
  const resName = document.getElementById("res-name")
  const resAddress = document.getElementById("res-address")
  const resImage = document.getElementById("res-image")
  const docRef = doc(db, "restaurant", urlParams.get('restaurant'));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    resName.innerHTML = docSnap.data().name
    resAddress.innerHTML = docSnap.data().address
    resImage.src = docSnap.data().image
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
}

getRestaurantDetail()

let dishes = []

const getAllDishes = async () => {
  const allDishes = document.getElementById("all-dishes");
  const q = query(collection(db, "dishes"), where('restaurant', '==', urlParams.get('restaurant')));
  const querySnapshot = await getDocs(q);
  allDishes.innerHTML = ` `
  querySnapshot.forEach((doc) => {
    dishes.push({ ...doc.data(), id: doc.id })
    pageSpinner.style.display = "none"
    mainContent.style.display = "block"
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
              <button onclick="updateQty('-','${doc.id}')" class="qty-btn">
                <i  class="fa-solid fa-minus"></i>
              </button>
              <span class="fw-bold" id="${doc.id}">1</span>
              <button onclick="updateQty('+','${doc.id}')" class="qty-btn">
                <i class="fa-solid fa-plus"></i>
              </button>

              <a href="#" onclick="addToCart('${doc.id}')" class="btn btn-primary">Add To Cart</a>
            </div>
          </div>
        </div>
      </div>
`

  });
}
getAllDishes()

const updateQty = (type, id) => {
  const qty = document.getElementById(id);
  if (Number(qty.innerHTML) < 2 && type === '-') {
    return
  }
  if (type === '+') {
    qty.innerHTML = Number(qty.innerHTML) + 1;
  }
  else {
    qty.innerHTML = Number(qty.innerHTML) - 1;
  }
  console.log(type, id);

}


const addToCart = (id) => {
  const cartItems = localStorage.getItem('cart')
  const cart = cartItems ? JSON.parse(cartItems) : []
  const qty = document.getElementById(id);
  const dish = dishes.filter(v => v.id === id)
  cart.push({ ...dish[0], qty: Number(qty.innerHTML) })
  localStorage.setItem('cart', JSON.stringify(cart))
  getCartItems()
  console.log("cart-->", cart);
  const sum = cart.reduce((a, b) => a + Number(b.price) * b.qty, 0)
  console.log('sum-->', sum);
}

const getCartItems = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart'))
  const cart = document.getElementById("cart")
  cart.innerHTML = ``
  if (cartItems) {

    for (let i = 0; i < cartItems.length; i++) {
      console.log(cartItems[i]);
      cart.innerHTML += `
      <div class="card dish-card w-100 mb-3">
      <div class="card-body">
        <div
          class="d-flex align-items-center justify-content-between"
        >
          <div class="d-flex align-items-center">
            <img
              class="dish-img"
              src="${cartItems[i].image}"
              alt=""
            />
            <div class="p-2">
              <h5 class="card-title">${cartItems[i].name}</h5>
              <h3 class="card-title">Rs ${cartItems[i].price} x ${cartItems[i].qty} = ${cartItems[i].price * cartItems[i].qty} </h3>
              <p class="card-text">${cartItems[i].serving}</p>
            </div>
          </div>
          <a href="#" class="btn btn-primary">
            <i class="fa-solid fa-trash"></i
          ></a>
        </div>
      </div>
    </div>
      `
    }
  }
}
getCartItems()

window.updateQty = updateQty
window.addToCart = addToCart
