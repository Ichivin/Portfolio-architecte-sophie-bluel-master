const galleryContainer = document.getElementById("gallery");

/* fonction pour crée des elements dans modale.js*/
function createHtmlElement(tag, className, parent, eventType, listenerCallBack) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (listenerCallBack) {
        element.addEventListener(eventType, listenerCallBack);
    }
    parent.appendChild(element);
    return element;
}

/* fonction pour afficher les images*/
function displayImages(imagesTable, imagesContainer) {
    imagesContainer.innerHTML = "";
    imagesTable.forEach((image) => {
        const figure = document.createElement("figure");
        const figCaption = document.createElement("figcaption");
        const figImage = document.createElement("img");

        figImage.alt = image.title;
        figImage.src = image.imageUrl;
        figCaption.textContent = image.title;
        imagesContainer.appendChild(figure);
        figure.appendChild(figImage);
        figure.appendChild(figCaption);
    });
}

/* fonction pour afficher les cadres d'image dans une modale*/
function displayModalImages(imagesTable, imagesContainer) {
    imagesContainer.innerHTML = "";
    imagesTable.forEach((image) => {
        const divImages = document.createElement("div");
        const figImage = document.createElement("img");

        figImage.alt = image.title;
        figImage.src = image.imageUrl;

        imagesContainer.appendChild(divImages);
        divImages.appendChild(figImage);

        const modalTrash = document.createElement("button");
        modalTrash.className = "modale-trash";
        modalTrash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        divImages.appendChild(modalTrash);
        modalTrash.addEventListener("click", () => {
            fetch(`http://localhost:5678/api/works/${image.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Sophie_token")}`,
                },
            }).then((response) => {
                if (response.ok) {
                    allImagesTable = [...allImagesTable.filter((element) => element.id !== image.id)];

                    divImages.remove();
                    displayImages(allImagesTable, galleryContainer);
                }
            });
        });
    });
}
