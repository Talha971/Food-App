import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc, query, where, getDocs } from "./firebase.js";

const uploadFile = (file, name) => {
    return new Promise((resolve, reject) => {
        // const fileName = file.name

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
    const resSelect = document.getElementById("restaurant-name");
    resSelect.innerHTML = `<option selected>Select Restaurant</option>`
    const q = collection(db, "restaurant");
    let index = 0
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        index++
        console.log(doc.id, " => ", doc.data());
        resSelect.innerHTML += `<option value="${doc.id}">${doc.data().name}</option>`

    });
}
getAllRestaurants();


const getAllDishes = async () => {
    const allDishes = document.getElementById("all-dishes");
    allDishes.innerHTML = ``
    const q = collection(db, "dishes");
    let index = 0
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        index++
        console.log(doc.id, " => ", doc.data());
        allDishes.innerHTML += `
        <tr>
            <th scope="row">1</th>
            <td><img class="dish-image" src="${doc.data().image}" alt="" /></td>
            <td>${doc.data().name}</td>
            <td>${doc.data().price}</td>
            <td>${doc.data().serving}</td>
            <td>@mdo</td>
        </tr>`

    });
}
getAllDishes();


const addDish = document.getElementById("addDish")
addDish.addEventListener("click", async () => {
    const closeBtn = document.getElementById("close-btn")
    const spinner = document.getElementById("dish-spinner")
    const resName = document.getElementById("restaurant-name")
    const dishName = document.getElementById("dish-name")
    const dishPrice = document.getElementById("dish-price")
    const dishServing = document.getElementById("dish-serving")
    const dishImage = document.getElementById("dish-image")
    spinner.style.display = "block"

    const image = await uploadFile(dishImage.files[0], dishName.value)


    const dishDetail = {
        restaurant: resName.value,
        name: dishName.value,
        price: dishPrice.value,
        serving: dishServing.value,
        image,

    }
    const docRef = await addDoc(collection(db, "dishes"), dishDetail);
    dishImage.value = ""
    dishName.value = ""
    dishPrice.value = ""
    dishServing.value = ""
    spinner.style.display = "none"
    closeBtn.click()
    getAllDishes()
    console.log(docRef);
})