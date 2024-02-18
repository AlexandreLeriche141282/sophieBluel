const photoSophie = document.getElementById("portfolio")
const btnSort = document.querySelectorAll(".btnSort")
let photo = [];
let filterMethod = "all"

// -------------------------------------------------------
// ******* Récupération des données ******** //
async function getWorks() {
    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => photo = data);
    console.log(photo);
    displayPhoto()    
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
                displayPhoto()
            })
            
        })

// -----------------------------------------------------------
// ********* Fonction getWorks jouée au chargement ***** //
 window.addEventListener("load", getWorks); 
                
                