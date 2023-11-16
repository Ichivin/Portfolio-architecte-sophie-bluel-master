const divImage = document.getElementById("gallery");

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

function displayImages(images_, imagesContainer) {
    imagesContainer.innerHTML = "";
    images_.forEach((image) => {
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

function displayModaleImages(images_, imagesContainer) {
    imagesContainer.innerHTML = "";
    images_.forEach((image) => {
        const divImages = document.createElement("div");
        const figImage = document.createElement("img");

        figImage.alt = image.title;
        figImage.src = image.imageUrl;

        imagesContainer.appendChild(divImages);
        divImages.appendChild(figImage);

        const modaleTrash = document.createElement("button");
        modaleTrash.className = "modale-trash";
        modaleTrash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        divImages.appendChild(modaleTrash);
        modaleTrash.addEventListener("click", () => {
            fetch(`http://localhost:5678/api/works/${image.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Sophie_token")}`,
                },
            }).then((response) => {
                if (response.ok) {
                    images = [...images.filter((element) => element.id !== image.id)];

                    divImages.remove();
                    displayImages(images, divImage);
                }
            });
        });
    });
}
