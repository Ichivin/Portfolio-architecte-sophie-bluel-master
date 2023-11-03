function displayImages(images_, divImage) {
    divImage.innerHTML = "";
    images_.forEach((image) => {
        const figure = document.createElement("figure");
        const figCaption = document.createElement("figcaption");
        const figImage = document.createElement("img");

        figImage.alt = image.title;
        figImage.src = image.imageUrl;
        figCaption.textContent = image.title;
        divImage.appendChild(figure);
        figure.appendChild(figImage);
        figure.appendChild(figCaption);
    });
}

function displayModaleImages(images_, divImage) {
    divImage.innerHTML = "";
    images_.forEach((image) => {
        const divImages = document.createElement("div");
        const figImage = document.createElement("img");

        figImage.alt = image.title;
        figImage.src = image.imageUrl;

        divImage.appendChild(divImages);
        divImages.appendChild(figImage);

        const modaleTrash = document.createElement("button");
        modaleTrash.className = "modale-trash";
        modaleTrash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        divImages.appendChild(modaleTrash);
        modaleTrash.addEventListener("click", () => {
            fetch(`http://localhost:5678/api/works/${image.id}`, {
                method: "DELETE",
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer {   "userId": ${localStorage.getItem("user_id")},   
                    "token": ${localStorage.getItem("Sophie_token")}`,
                },
            });
        });
    });
}
