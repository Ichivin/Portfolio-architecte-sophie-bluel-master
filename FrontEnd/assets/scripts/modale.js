function openModale(gallery) {
    const modaleContainer = document.getElementById("modale-container");
    modaleContainer.innerHTML = "";
    const modaleBackground = document.createElement("div");
    modaleBackground.className = "modale-background";
    modaleContainer.appendChild(modaleBackground);

    const modaleWhite = document.createElement("div");
    modaleWhite.className = "modale-white";
    modaleBackground.appendChild(modaleWhite);

    const modalePage1 = document.createElement("div");
    modalePage1.className = "modale-page1";
    modaleWhite.appendChild(modalePage1);

    const modaleClose = document.createElement("button");
    modaleClose.className = "modale-close";
    modalePage1.appendChild(modaleClose);
    modaleClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    modaleClose.addEventListener("click", () => {
        modaleContainer.innerHTML = "";
    });

    const modaleTitle = document.createElement("h2");
    modaleTitle.className = "modale-title";
    modalePage1.appendChild(modaleTitle);
    modaleTitle.innerText = "Galerie photo";

    const modaleGallery = document.createElement("div");
    modaleGallery.className = "modale-gallery";
    modalePage1.appendChild(modaleGallery);
    displayModaleImages(gallery, modaleGallery);

    const addImage = document.createElement("button");
    addImage.className = "add-image";
    modalePage1.appendChild(addImage);
    addImage.innerHTML = "Ajouter une photo";
    addImage.addEventListener("click", () => {
        modalePage2.className = "modale-page2 modale-slide-left";
    });

    const modalePage2 = document.createElement("div");
    modalePage2.className = "modale-page2";
    modaleWhite.appendChild(modalePage2);

    const modaleTitle2 = document.createElement("h2");
    modaleTitle2.className = "modale-title2";
    modalePage2.appendChild(modaleTitle2);
    modaleTitle2.innerText = "Ajout photo";

    const form = document.createElement("form");
    form.className = "modale-page2__form";
    modalePage2.appendChild(form);

    const inputFile = document.createElement("input");
    inputFile.name = "image";
    inputFile.type = "file";
    inputFile.className = "modale-page2__file";
    form.appendChild(inputFile);

    const modaleBack = document.createElement("button");
    modaleBack.className = "modale-back";
    modalePage2.appendChild(modaleBack);
    modaleBack.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    modaleBack.addEventListener("click", () => {
        modalePage2.className = "modale-page2";
    });

    const formFieldTitle = document.createElement("div");
    formFieldTitle.className = "form-field";
    formFieldTitle.name = "title";
    form.appendChild(formFieldTitle);

    const titleLabel = document.createElement("label");
    titleLabel.className = "title-label";
    formFieldTitle.appendChild(titleLabel);
    titleLabel.innerText = "Titre";

    const modalePage2TextArea = document.createElement("input");
    modalePage2TextArea.className = "modale-page2-text-area";
    formFieldTitle.appendChild(modalePage2TextArea);

    const formFieldSelect = document.createElement("div");
    formFieldSelect.className = "form-field";
    form.appendChild(formFieldSelect);

    const categoryLabel = document.createElement("label");
    categoryLabel.className = "title-label";
    formFieldSelect.appendChild(categoryLabel);
    categoryLabel.innerText = "Catégorie";

    const modalePage2Select = document.createElement("select");
    modalePage2Select.name = "category";
    modalePage2Select.className = "modale-page2-select";
    formFieldSelect.appendChild(modalePage2Select);

    fetch("http://localhost:5678/api/categories")
        .then((response) => response.json())
        .then((categories) => {
            categories.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.id;
                option.innerText = category.name;
                modalePage2Select.appendChild(option);
            });
        });

    const submitButton = document.createElement("button");
    submitButton.className = "submit-button";
    form.appendChild(submitButton);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(localStorage.getItem("user_id"));
        console.log(localStorage.getItem("Sophie_token"));
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer {   "userId": ${localStorage.getItem("user_id")},   
                    "token": ${localStorage.getItem("Sophie_token")}`,
            },
        })
            .then((response) => response.json())
            .then((loginData) => {
                if (!loginData.error) {
                    localStorage.setItem("Sophie_token", loginData.token);
                    localStorage.setItem("user_id", loginData.userId);
                    window.location.assign("./index.html");
                } else {
                    alert("Adresse Email ou Mot de passe invalide");
                }
            });
    });
}
