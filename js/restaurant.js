import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc, query, where, getDocs } from "./firebase.js";
const logo = document.getElementById("restaurant-logo")
const selectedLogo = document.getElementById("selected-logo")
let file;
logo && logo.addEventListener("change", (e) => {
    file = e.target.files[0]
    selectedLogo.style.display = "block"
    selectedLogo.src = URL.createObjectURL(e.target.files[0])
})



const uploadFile = (file, name) => {
    return new Promise((resolve, reject) => {
        const fileName = file.name

        const storageRef = ref(storage,
            `images/${name.split(" ").join("-")}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL)
                });
            }
        );
    })
}

const getAllRestaurants = async () => {
    const resList = document.getElementById("res-list");
    resList.innerHTML = '';
    const q = collection(db, "restaurant");
    let index = 0
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        index++
        console.log(doc.id, " => ", doc.data());
        resList.innerHTML += `
            <tr>
              <th scope="row">${index}</th>
              <td><img class="res-logo-image" src="${doc.data().image}" alt="" /></td>
              <td>${doc.data().name}</td>
              <td>${doc.data().address}</td>
            </tr>
        `

    });
}
getAllRestaurants();

const submitRestaurant = document.getElementById("submit-restaurant")

submitRestaurant && submitRestaurant.addEventListener("click", async () => {
    const name = document.getElementById("restaurant-name")
    const spinner = document.getElementById("restaurant-spinner")
    const address = document.getElementById("restaurant-address")
    spinner.style.display = "block"
    const image = await uploadFile(file, name.value)
    const docRef = await addDoc(collection(db, "restaurant"), {
        name: name.value,
        address: address.value,
        image
    });
    spinner.style.display = "none"

    name.value = "";
    address.value = "";
    logo.value = ""
    selectedLogo.style.display = "none";

    console.log("Document written with ID: ", docRef.id);
    console.log(name.value, address.value, file);

    const closeBtn = document.getElementById("close-btn")
    getAllRestaurants()
    closeBtn.click()
})

export { uploadFile }