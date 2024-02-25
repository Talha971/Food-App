
const logo = document.getElementById("restaurant-logo")
const selectedLogo = document.getElementById("selected-logo")
let file;
logo.addEventListener("change", (e) => {
    file = e.target.files[0]
    selectedLogo.style.display = "block"
    selectedLogo.src = URL.createObjectURL(e.target.files[0])
})

const submitRestaurant = document.getElementById("submit-restaurant")
submitRestaurant.addEventListener("click", () => {
    const name = document.getElementById("restaurant-name")
    const address = document.getElementById("restaurant-address")
    console.log(name.value, address.value, file);

})
