import { collection, getDocs, db, where, query, getDoc, doc, serverTimestamp, addDoc } from "./firebase.js";


const placeOrder = document.getElementById("placeOrder")
placeOrder.addEventListener("click", async () => {
    const cartDiv = document.getElementById("cart")
    const customerName = document.getElementById("customerName")
    const customerContact = document.getElementById("customerContact")
    const customerAddress = document.getElementById("customerAddress")
    const cart = JSON.parse(localStorage.getItem("cart"))
    console.log(customerName.value, customerContact.value, customerAddress.value, cart);

    const dishDetail = {
        customerName: customerName.value,
        customerContact: customerContact.value,
        customerAddress: customerAddress.value,
        status: "pending",
        cart,
        timeStamp: serverTimestamp()
    }
    await addDoc(collection(db, "orders"), orderDetail);
    Swal.fire({
        position: "center center",
        icon: "success",
        title: "Your order has been placed",
        showConfirmButton: false,
        timer: 1500
    });

    customerAddress = ''
    customerContact = ''
    customerName = ''
    localStorage.removeItem('cart')
    cartDiv.innerHTML = ''
})
