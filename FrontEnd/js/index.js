

// -------------------------------------------------------




// --------------------------------------------------------------------

window.addEventListener("load", (event) => {
    // Initialisation des constantes
    const titleAddPhoto = document.getElementById("titleAddPhoto")
    const buttonAddPhoto = document.getElementById("buttonAddPhoto")
    const addPhoto = document.querySelector(".addPhoto")
    const photoLine = document.querySelector(".photoLine")
    const buttonValid = document.querySelector("form .buttonValid")
    const formData = new FormData
    const modalOverlay = document.querySelector(".modalOverlay")
    const previewImg = document.querySelector(".addPhotoContainer img")
    const inputFile = document.querySelector(".addPhotoContainer input")
    const labelFile = document.querySelector(".addPhotoContainer label")
    const iconFile = document.querySelector(".addPhotoContainer .fa-image")
    const pFile = document.querySelector(".addPhotoContainer p")
    const arrowLeft = document.getElementById("arrowLeft")
    const photoLine2 = document.querySelector(".photoLine2")
    const titleForm = document.getElementById("title")
    const categoryForm = document.getElementById("category")
    const photoHtmlAccueil = document.getElementById("portfolio")
    const photosHtmlModal = document.querySelector(".photos")
    const btnSort = document.querySelectorAll(".btnSort")
    let lstPhoto = [];
    let filterMethod = "all";
    const formAddPhoto = document.getElementById("form")
    const errorMessageModale = document.getElementById('errorMessageModale');
    // const photos = document.querySelector(".photos")


    recoveryOfCategories(categoryForm)

    // Retour sur les projets après ajout d'images
    returnProjet(titleAddPhoto, buttonAddPhoto, addPhoto, photoLine, previewImg, inputFile, labelFile, iconFile, pFile, photosHtmlModal, formAddPhoto, buttonValid)

    // Vérification si formulaire correctement rempli
    verificationForm(buttonValid, formAddPhoto)

    // Permet l'ajout de photos
    sendPhoto(formData, modalOverlay, inputFile, titleForm, formAddPhoto)

    // Ecoute les changements dans l'input
    inputFileChange(previewImg, inputFile, labelFile, iconFile, pFile)

    // Retour gallerie
    returnGallery(arrowLeft, titleAddPhoto, buttonAddPhoto, buttonAddPhoto, addPhoto, photoLine)

    // Affichage modale pour ajout de photo
    displayAddPicture(photoLine, titleAddPhoto, arrowLeft, addPhoto, buttonAddPhoto, photoLine2, photosHtmlModal, formAddPhoto, buttonValid)

    getWorks(photoHtmlAccueil, photosHtmlModal, lstPhoto) 

    // ********* Clique affichage photos par séléction ***** //

    btnSort.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            filterMethod = e.target.id;
            btnSort.forEach(btn => {
                btn.classList.remove("active")
            })
            btn.classList.add("active")
            displayPhoto(filterMethod)
        })

    })
    // -----------------------------------------------------------

    displayPhoto(photoHtmlAccueil, lstPhoto, filterMethod)


    // ********* Fonction getWorks jouée au chargement ***** //

    getWorks(photoHtmlAccueil,photosHtmlModal);
    const loginLink = document.querySelector('#nav-login');
    const filterButton = document.getElementById("filter");



    // Vérifier si le token est présent dans le sessionStorage
    const token = sessionStorage.getItem('token');

    if (token) {
        //***** Si token login = logout ******//
        loginLink.textContent = 'logout';
        // **** enlever boutons filtres ** //
        filterButton.style.display = "none";
        buttonModify.style.visibility = "visible";
        // Changer le texte du lien en "logout" après la connexion réussie
        loginLink.textContent = 'logout';
    }
    // Gérer la déconnexion lorsque l'utilisateur clique sur "logout"
    loginLink.addEventListener('click', function () {
        if (token) {
            sessionStorage.removeItem('token');

        }
    });
    // ******** Affichage au clique de la modale / Fermeture modale ***** //
const displayModal = document.getElementById("buttonModify").addEventListener("click", () => {
    const modalOverlay = document.querySelector(".modalOverlay")
    modalOverlay.classList.add("activeModal")
    const modalClosed = document.getElementById("modalClosed")
    modalClosed.addEventListener("click", () => {
        modalOverlay.classList.remove("activeModal")
        formAddPhoto.reset();
    })
    modalOverlay.addEventListener("click", (e) => {
        if (e.target.className == "modalOverlay activeModal") {
            modalOverlay.classList.remove("activeModal")
            formAddPhoto.reset();
        }

    })
})
});






