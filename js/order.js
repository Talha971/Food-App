import { collection, getDocs, db, where, query, getDoc, doc, serverTimestamp, addDoc, updateDoc } from "./firebase.js";


const placeOrder = document.getElementById("placeOrder")
placeOrder && placeOrder.addEventListener("click", async () => {
    const cartDiv = document.getElementById("cart")
    const customerName = document.getElementById("customerName")
    const customerContact = document.getElementById("customerContact")
    const customerAddress = document.getElementById("customerAddress")
    const cart = JSON.parse(localStorage.getItem("cart"))
    const sum = cart.reduce((a, b) => a + Number(b.price) * b.qty, 0)
    const totalAmount = document.getElementById("totalAmount")
    const closeBtn = document.getElementById("closeBtn")

    console.log(customerName.value, customerContact.value, customerAddress.value, cart);

    const orderDetail = {
        customerName: customerName.value,
        customerContact: customerContact.value,
        customerAddress: customerAddress.value,
        status: "pending",
        cart,
        timeStamp: serverTimestamp(),
        orderAmount: sum,
        deliveryCharges: 100,
        totalAmount: sum + 100
    }
    await addDoc(collection(db, "orders"), orderDetail);
    Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Your order has been placed",
        showConfirmButton: false,
        timer: 1500,
    });

    customerAddress.value = ''
    customerContact.value = ''
    customerName.value = ''
    localStorage.removeItem('cart')
    cartDiv.innerHTML = ''
    totalAmount.innerHTML = ``
    closeBtn.click()

})

const getAllOrder = async () => {
    const allOrders = document.getElementById("all-orders")
    const mainContent = document.getElementById("main-content")
    const pageSpinner = document.getElementById("spinner-div")
    const q = collection(db, "orders");
    let index = 0
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        index++
        console.log("order", doc.data());
        let status = doc.data().status
        let statusColor = ''
        if (status === "pending") {
            statusColor = "bg-warning"
        }
        else if (status === "delivered") {
            statusColor = "bg-success"
        }

        allOrders.innerHTML += `
        <tr>
            <th scope="row">${index}</th>
            <td>${doc.data().customerName}</td>
            <td>${doc.data().customerContact}</td>
            <td>${doc.data().customerAddress}</td>
            <td><span class="badge ${statusColor} ">${status}</span></td>
            <td>${doc.data().totalAmount}</td>
            <td>
                <button
                onclick="viewOrderDetail('${doc.id}')"
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                >
                View Details
                </button>
            </td>

        </tr>
    `
    })
    pageSpinner.style.display = "none"
    mainContent.style.display = "block"
}
getAllOrder();
let updateOrderId
const viewOrderDetail = async (id) => {
    updateOrderId = id
    const cart = document.getElementById("cart")
    const orderStatus = document.getElementById("orderStatus")
    const docRef = doc(db, "orders", id);
    const docSnap = await getDoc(docRef);
    console.log("docSnap", docSnap.data());
    orderStatus.value = docSnap.data().status

    let cartItems = docSnap.data().cart
    cart.innerHTML = ``
    for (let i = 0; i < cartItems.length; i++) {

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

        </div>
      </div>
    </div>
      `
    }
}
const updateOrder = document.getElementById("updateOrder")
updateOrder.addEventListener("click", async () => {
    const closeBtn = document.getElementById("close-btn")
    const orderStatus = document.getElementById("orderStatus")
    const docRef = doc(db, "orders", updateOrderId);
    await updateDoc(docRef, {
        status: orderStatus.value
    });
    closeBtn.click()
    getAllOrder()
    console.log(updateOrderId);
})


window.viewOrderDetail = viewOrderDetail