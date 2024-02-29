const photoSophie = document.getElementById("portfolio")
const btnSort = document.querySelectorAll(".btnSort")
let photo = [];
let filterMethod = "all"
const photos = document.querySelector(".photos")

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
const displayModal = document.getElementById("buttonModify").addEventListener("click", ()=>{
    const modalOverlay = document.querySelector(".modalOverlay")
    modalOverlay.classList.add("activeModal")
    const modalClosed = document.getElementById("modalClosed").addEventListener("click", ()=>{
        modalOverlay.classList.remove("activeModal")
    })
    modalOverlay.addEventListener("click", (e) => {
        if (e.target.className == "modalOverlay activeModal") {
            modalOverlay.classList.remove("activeModal")
        }

    })
})

    

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
            <i id=${works.id} class="fa-solid fa-trash-can"></i>
            <img src = ${works.imageUrl} alt"${works.title}">
            </div>
            `
                
        )
        .join("")
    
        
    
    function deletePhoto() {
    const garbageAll = document.querySelectorAll(".fa-trash-can")
    garbageAll.forEach(garbage => {
    garbage.addEventListener("click", () => {
        
        const id = garbage.id
        const init = {
            method: "DELETE",
            headers: {
                authorization: "Bearer" + sessionStorage.getItem('token'),
                accept: "*/*",
                

            },
        }
        fetch("http://localhost:5678/api/works/1" + id, init)
            .then((response) => {
            if (!response.ok) {
                console.log("delete error");
            }
            return response.json()
        }) 
            .then((data) => {
                console.log("delete ok:",data);
                displayPhotoModal()
                displayPhoto()
            })
        
       console.log(id); 
    })
})

}
deletePhoto()
}



