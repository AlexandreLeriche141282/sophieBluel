// ******* Récupération des données ******** //
async function getWorks(photoHtmlAccueil, photosHtmlModal, lstPhoto) {
    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => lstPhoto = data);
    console.log(lstPhoto);
    displayPhoto(photoHtmlAccueil, lstPhoto)
    displayPhotoModal(photosHtmlModal, lstPhoto)

}
// -----------------------------------------------------------


// ********** Affichage des photos avec filtres ************ //
function displayPhoto(photoHtmlAccueil, lstPhoto, filterMethod) {
    photoHtmlAccueil.innerHTML = lstPhoto

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


// ----------------------------------------------------------------


// ********* Affichage des photos avec la modale ******* //
function displayPhotoModal(photosHtmlModal, lstPhoto, filterMethod) {
    photosHtmlModal.innerHTML = lstPhoto
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
    deletePhoto()

}
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
// -------------------------------------------------------------------



// ***** Affichage modale "ajout de photo" ***** //
function displayAddPicture(photoLine, titleAddPhoto, arrowLeft, addPhoto, buttonAddPhoto, photoLine2, photos, formAddPhoto, buttonValid) {
    document.getElementById("buttonAddPhoto").addEventListener("click", () => {
        photoLine.style.display = "none";
        titleAddPhoto.textContent = "Ajout photo";
        buttonValid.style.margin = "30px auto 0";
        arrowLeft.style.display = "flex";
        formAddPhoto.style.display = "flex";
        addPhoto.style.display = "flex";
        photos.style.display = "none";
        buttonAddPhoto.style.visibility = "hidden";
        photoLine2.style.display = "flex";
    })
}

// ------------------------------------------------------------------------



// *** Retour galerie *** //
function returnGallery(arrowLeft, titleAddPhoto, buttonAddPhoto, buttonAddPhoto, addPhoto, photoLine) {
    arrowLeft.addEventListener("click", () => {
        arrowLeft.style.display = "none";
        titleAddPhoto.textContent = "Galerie photos";
        formAddPhoto.style.display = "none";
        buttonAddPhoto.style.visibility = "visible";
        addPhoto.style.display = "none";
        photos.style.display = "grid";
        photoLine.style.display = "flex";
    })
}

// --------------------------------------------------------------


// *** Prev Image *** //




// *** Input file changement *** //
function inputFileChange(previewImg, inputFile, labelFile, iconFile, pFile) {
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
}







// *** Récupération des catégories *** //
async function recoveryOfCategories() {
    const select = document.querySelector(".modalContent select");
    const categoryForm = await fetchCategories();

    categoryForm.forEach(category => {

        const option = document.createElement("option")
        option.value = category.id
        option.textContent = category.name
        select.appendChild(option)
    });
}



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
function sendPhoto(formData, modalOverlay, inputFile, titleForm, formAddPhoto) {
    formAddPhoto.addEventListener("submit", (e) => {
        e.preventDefault()
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
        modalOverlay.classList.remove("activeModal")
        formAddPhoto.reset();

    })

}
// -------------------------------------------------------------

// Vérification du formulaire si tout les champs sont remplis//
function verificationForm(buttonValid, formAddPhoto) {
    formAddPhoto.addEventListener("input", () => {
        const inputFile = document.querySelector(".addPhotoContainer input")
        if (title.value != "" && category.value != "" && inputFile.value != "") {
            buttonValid.style.backgroundColor = "rgb(57,117,105)"
            buttonValid.disabled = false;

        }
        else {
            buttonValid.style.backgroundColor = "rgb(167,167,167)"
            buttonValid.disabled = true;
        }

    })
}

// Retour sur les projets après ajout d'images //
function returnProjet(titleAddPhoto, buttonAddPhoto, addPhoto, photoLine, previewImg, inputFile, labelFile, iconFile, pFile, photos, formAddPhoto, buttonValid) {
    buttonValid.addEventListener("click", () => {
        titleAddPhoto.textContent = "Galerie photos";
        formAddPhoto.style.display = "none";
        buttonAddPhoto.style.visibility = "visible";
        addPhoto.style.display = "none";
        photos.style.display = "grid";
        photoLine.style.display = "flex";
        previewImg.style.display = "none"
        inputFile.style.visibility = "visible"
        labelFile.style.visibility = "visible"
        iconFile.style.visibility = "visible"
        pFile.style.visibility = "visible"

    })

}