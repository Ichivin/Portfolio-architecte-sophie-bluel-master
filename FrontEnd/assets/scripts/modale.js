function openModale(gallery) {
    const modaleContainer = document.getElementById("modale-container");
    modaleContainer.innerHTML = "";
    const modaleBackground = document.createElement("div");
    modaleBackground.className = "modale-background";
    modaleContainer.appendChild(modaleBackground);

    const modaleWhite = document.createElement("div");
    modaleWhite.className = "modale-white";
    modaleBackground.appendChild(modaleWhite);

    const modaleClose = document.createElement("button");
    modaleClose.className = "modale-close";
    modaleWhite.appendChild(modaleClose);
    modaleClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    modaleClose.addEventListener("click", () => {
        modaleContainer.innerHTML = "";
    });

    const modaleTitle = document.createElement("h2");
    modaleTitle.className = "modale-title";
    modaleWhite.appendChild(modaleTitle);
    modaleTitle.innerText = "Galerie photo";

    const modaleGallery = document.createElement("div");
    modaleGallery.className = "modale-gallery";
    modaleWhite.appendChild(modaleGallery);
    displayModaleImages(gallery, modaleGallery);

    const addImage = document.createElement("button");
    addImage.className = "add-image";
    modaleWhite.appendChild(addImage);
    addImage.innerHTML = "Ajouter une photo";
}




function addImageModale(addImageModale)