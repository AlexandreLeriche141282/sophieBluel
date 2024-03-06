const photoSophie = document.getElementById("portfolio")
const btnSort = document.querySelectorAll(".btnSort")
let photo = [];
let filterMethod = "all"
const photos = document.querySelector(".photos")
const formAddPhoto = document.getElementById("form")
const errorMessageModale = document.getElementById('errorMessageModale');


// -------------------------------------------------------


// ******* Récupération des données ******** //
async function getWorks() {
    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => photo = data);
    console.log(photo);
    displayPhoto()
    displayPhotoModal()

}
// -----------------------------------------------------------


// ********** Affichage des photos avec filtres ************ //
function displayPhoto() {
    photoSophie.innerHTML = photo

        .filter((a) => {
            if (filterMethod === "objets") {
                return a.category.name.includes("Objets");
            } else if (filterMethod === "appart") {
                return a.category.name.includes("Appartements");
            } else if (filterMethod === "hr") {
                return a.category.name.includes("Hotels & restaurants");
            } else if (filterMethod === "all") {
                return a.category.name.includes("Objets") + a.category.name.includes("Appartements") + a.category.name.includes("Hotels & restaurants")
            }
        })

        .map((works) =>

            `
            <div class="gallery">
            <figure>
            <img src = ${works.imageUrl} alt"${works.title}">
            <figcaption> ${works.title} </figcaption
            </figure>
            </div>
            `
        )
        .join("")
}
// --------------------------------------------------------

// ********* Clique affichage photos par séléction ***** //

btnSort.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        filterMethod = e.target.id;
        btnSort.forEach(btn => {
            btn.classList.remove("active")
        })
        btn.classList.add("active")
        displayPhoto()
    })

})
// -----------------------------------------------------------


// ********* Fonction getWorks jouée au chargement ***** //
window.addEventListener("load", getWorks);


// ******** Affichage au clique de la modale / Fermeture modale ***** //
const displayModal = document.getElementById("buttonModify").addEventListener("click", () => {
    const modalOverlay = document.querySelector(".modalOverlay")
    modalOverlay.classList.add("activeModal")
    const modalClosed = document.getElementById("modalClosed").addEventListener("click", () => {
        modalOverlay.classList.remove("activeModal")
    })
    modalOverlay.addEventListener("click", (e) => {
        if (e.target.className == "modalOverlay activeModal") {
            modalOverlay.classList.remove("activeModal")
        }

    })
})
// ----------------------------------------------------------------


// ********* Affichage des photos avec la modale ******* //
function displayPhotoModal() {
    photos.innerHTML = photo
        .filter((a) => {
            if (filterMethod === "objets") {
                return a.category.name.includes("Objets");
            } else if (filterMethod === "appart") {
                return a.category.name.includes("Appartements");
            } else if (filterMethod === "hr") {
                return a.category.name.includes("Hotels & restaurants");
            } else if (filterMethod === "all") {
                return a.category.name.includes("Objets") + a.category.name.includes("Appartements") + a.category.name.includes("Hotels & restaurants")
            }

        })
        .map((works) =>

            `
            <div class="photos">
            <i data-id=${works.id} class="fa-solid fa-trash-can"></i>
            <img src = ${works.imageUrl} alt"${works.title}">
            </div>
            `

        )
        .join("")
    const formAddPhoto = document.getElementById("form")
    formAddPhoto.style.display = "none";
    const arrowLeft = document.getElementById("arrowLeft")
    arrowLeft.style.display = "none";
    // --------------------------------------------------------------


    // ******** Suppression des photos ***** //
    function deletePhoto() {
        const garbageAll = document.querySelectorAll(".fa-trash-can")
        garbageAll.forEach(garbage => {
            garbage.addEventListener("click", (event) => {

                const id = event.target.dataset.id;

                console.log(id);
                const init = {
                    method: "DELETE",
                    headers: {
                        authorization: "Bearer " + sessionStorage.getItem('token'),
                        accept: "*/*",


                    },
                }
                fetch("http://localhost:5678/api/works/" + id, init)
                    .then((response) => {
                        if (!response.ok) {
                            console.log("delete error");
                        }
                        return response
                    })

                    .then((data) => {
                        console.log("delete ok:", data);
                        getWorks()
                        displayPhoto()
                    })


            })
        })
        const addPhoto = document.querySelector(".addPhoto")
        addPhoto.style.display = "none";

    }
    deletePhoto()

}
// -------------------------------------------------------------------



// ***** Affichage modale "ajout de photo" ***** //
const buttonAddPhoto = document.getElementById("buttonAddPhoto").addEventListener("click", () => {
    const photoLine = document.querySelector(".photoLine")
    photoLine.style.display = "none";
    const titleAddPhoto = document.getElementById("titleAddPhoto")
    titleAddPhoto.textContent = "Ajout photo";
    const buttonValid = document.querySelector("form .buttonValid")
    buttonValid.style.margin = "30px auto 0";

    const arrowLeft = document.getElementById("arrowLeft")
    arrowLeft.style.display = "flex";
    formAddPhoto.style.display = "flex";
    const addPhoto = document.querySelector(".addPhoto")
    addPhoto.style.display = "flex";
    photos.style.display = "none";
    const buttonAddPhoto = document.getElementById("buttonAddPhoto")
    buttonAddPhoto.style.visibility = "hidden";
    const photoLine2 = document.querySelector(".photoLine2")
    photoLine2.style.display = "flex";
})
// ------------------------------------------------------------------------



// *** Retour galerie *** //
arrowLeft.addEventListener("click", () => {
    const arrowLeft = document.getElementById("arrowLeft")
    arrowLeft.style.display = "none";
    const titleAddPhoto = document.getElementById("titleAddPhoto")
    titleAddPhoto.textContent = "Galerie photos";
    formAddPhoto.style.display = "none";
    const buttonAddPhoto = document.getElementById("buttonAddPhoto")
    buttonAddPhoto.style.visibility = "visible";
    const addPhoto = document.querySelector(".addPhoto")
    addPhoto.style.display = "none";
    photos.style.display = "grid";
    const photoLine = document.querySelector(".photoLine")
    photoLine.style.display = "flex";
})
// --------------------------------------------------------------


// *** Prev Image *** //

const previewImg = document.querySelector(".addPhotoContainer img")
const inputFile = document.querySelector(".addPhotoContainer input")
const labelFile = document.querySelector(".addPhotoContainer label")
const iconFile = document.querySelector(".addPhotoContainer .fa-image")
const pFile = document.querySelector(".addPhotoContainer p")


// *** Input file changement *** //
inputFile.addEventListener("change", () => {
    const file = inputFile.files[0]
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImg.src = e.target.result
            previewImg.style.display = "flex"
            inputFile.style.visibility = "hidden"
            labelFile.style.visibility = "hidden"
            iconFile.style.visibility = "hidden"
            pFile.style.visibility = "hidden"
        }
        reader.readAsDataURL(file);
    }
})



const titleForm = document.getElementById("title")
const categoryForm = document.getElementById("category")


// *** Récupération des catégories *** //
async function displayphotoModales() {
    const select = document.querySelector(".modalContent select");
    const categoryForm = await fetchCategories();

    categoryForm.forEach(category => {

        const option = document.createElement("option")
        option.value = category.id
        option.textContent = category.name
        select.appendChild(option)
    });
}
displayphotoModales()


async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des catégories de l'API");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
// ---------------------------------------------------------


// **** Post , ajouter nouvelle photo **** //
function sendPhoto() {
    formAddPhoto.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData
        formData.append("image", inputFile.files[0]);
        formData.append("title", titleForm.value);
        formData.append("category", categoryForm.value);
        fetch('http://localhost:5678/api/works', {
            method: "POST",
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem('token'),


            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                getWorks()
                console.log(data);
                console.log("voici la photo ajoutée", data);

            })
        const modalOverlay = document.querySelector(".modalOverlay")
        modalOverlay.classList.remove("activeModal")
        form.reset();
        
    })

}
sendPhoto()
// -------------------------------------------------------------

// Vérification du formulaire si tout les champs sont remplis//
function verificationForm() {
    const buttonValid = document.querySelector("form .buttonValid")
    form.addEventListener("input", () => {
        if (title.value != "" && category.value != "" && inputFile.value!="") {
            buttonValid.style.backgroundColor = "rgb(57,117,105)"
            buttonValid.disabled = false;
            
        }
        else {
            // (title.value === "" && category.value === "" && image.value === "")
            buttonValid.style.backgroundColor = "rgb(167,167,167)"
            buttonValid.disabled = true;
        }
        
    })
}
verificationForm()
// --------------------------------------------------------------------



// Retour sur les projets après ajout d'images //
const buttonValid = document.querySelector("form .buttonValid").addEventListener("click", () => {
    const titleAddPhoto = document.getElementById("titleAddPhoto")
    titleAddPhoto.textContent = "Galerie photos";
    formAddPhoto.style.display = "none";
    const buttonAddPhoto = document.getElementById("buttonAddPhoto")
    buttonAddPhoto.style.visibility = "visible";
    const addPhoto = document.querySelector(".addPhoto")
    addPhoto.style.display = "none";
    photos.style.display = "grid";
    const photoLine = document.querySelector(".photoLine")
    photoLine.style.display = "flex";
    previewImg.style.display = "none"
    inputFile.style.visibility = "visible"
    labelFile.style.visibility = "visible"
    iconFile.style.visibility = "visible"
    pFile.style.visibility = "visible"
    
})