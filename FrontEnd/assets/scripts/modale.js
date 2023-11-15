function openModale(gallery) {
    const modaleContainer = document.getElementById("modale-container");
    modaleContainer.innerHTML = "";
    const modaleBackground = document.createElement("div");
    modaleBackground.className = "modale-background";
    modaleBackground.addEventListener("click", (e) => {
        if (e.target == modaleBackground) {
            modaleContainer.innerHTML = "";
        }
    });
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

    const modaleClose2 = document.createElement("button");
    modaleClose2.className = "modale-close";
    modalePage2.appendChild(modaleClose2);
    modaleClose2.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    modaleClose2.addEventListener("click", () => {
        modaleContainer.innerHTML = "";
    });

    const modaleBack = document.createElement("button");
    modaleBack.className = "modale-back";
    modalePage2.appendChild(modaleBack);
    modaleBack.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    modaleBack.addEventListener("click", () => {
        modalePage2.className = "modale-page2";
    });

    const modaleTitle2 = document.createElement("h2");
    modaleTitle2.className = "modale-title2";
    modalePage2.appendChild(modaleTitle2);
    modaleTitle2.innerText = "Ajout photo";

    const form = document.createElement("form");
    form.className = "modale-page2__form";
    modalePage2.appendChild(form);

    const divAddImage = document.createElement("div");
    divAddImage.className = "modale-page2__div-add-image";
    divAddImage.innerHTML = '<i class="fa-regular fa-image modale-page2__icon"></i>';
    form.appendChild(divAddImage);

    const inputFile = document.createElement("input");
    inputFile.name = "image";
    inputFile.type = "file";
    inputFile.setAttribute("id", "file");
    divAddImage.appendChild(inputFile);

    const inputFileLabel = document.createElement("label");
    inputFileLabel.className = "modale-page2__file";
    inputFileLabel.setAttribute("for", "file");
    divAddImage.appendChild(inputFileLabel);
    inputFileLabel.innerText = "+ Ajouter photo";
    inputFile.addEventListener("change", (e) => {
        const imageDisplay = inputFile.files[0];
        if (imageDisplay.size <= 4194304 && imageDisplay.type.split("/")[0] == "image") {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageDisplay);
            fileReader.addEventListener("load", (e) => {
                imagePreview.innerHTML = `
                <img alt="apercu" src=${e.target.result} />
                `;
                updateSubmitButton();
            });
        }
    });

    const imagePreview = document.createElement("div");
    imagePreview.className = "modale-page2__image-preview";
    divAddImage.appendChild(imagePreview);

    const tailleImage = document.createElement("p");
    tailleImage.className = "modale-page2__taille-image";
    tailleImage.innerText = "jpg, png : 4mo max";
    divAddImage.appendChild(tailleImage);

    const formFieldTitle = document.createElement("div");
    formFieldTitle.className = "form-field";
    formFieldTitle.name = "title";
    form.appendChild(formFieldTitle);

    const titleLabel = document.createElement("label");
    titleLabel.className = "title-label";
    formFieldTitle.appendChild(titleLabel);
    titleLabel.innerText = "Titre";

    const modalePage2TextArea = document.createElement("input");
    modalePage2TextArea.className = "modale-page2__text-area";
    formFieldTitle.appendChild(modalePage2TextArea);
    modalePage2TextArea.addEventListener("change", () => {
        updateSubmitButton();
    });

    const formFieldSelect = document.createElement("div");
    formFieldSelect.className = "form-field";
    form.appendChild(formFieldSelect);

    const categoryLabel = document.createElement("label");
    categoryLabel.className = "title-label";
    formFieldSelect.appendChild(categoryLabel);
    categoryLabel.innerText = "Catégorie";

    const modalePage2Select = document.createElement("select");
    modalePage2Select.name = "category";
    modalePage2Select.className = "modale-page2__select";
    formFieldSelect.appendChild(modalePage2Select);
    modalePage2Select.addEventListener("change", () => {
        updateSubmitButton();
    });

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

    const divBarre = document.createElement("div");
    divBarre.className = "modale-page2__div-barre";
    form.appendChild(divBarre);

    const submitButton = document.createElement("button");
    submitButton.className = "submit-button";
    submitButton.innerText = "Valider";
    submitButton.disabled = true;
    form.appendChild(submitButton);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("image", inputFile.files[0]);
        data.append("title", modalePage2TextArea.value);
        console.log(modalePage2TextArea.value);
        data.append("category", modalePage2Select.value);
        console.log(modalePage2Select.value);
        console.log(data.entries());
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("Sophie_token")}`,
            },
            body: data,
        })
            .then((response) => response.json())
            .then((addImage) => {
                if (addImage.error) {
                    alert("Echec de l'ajout d'image");
                }
            });
    });

    function allFieldsAreFilled() {
        const validImage =
            inputFile.files[0] &&
            inputFile.files[0].size <= 4194304 &&
            inputFile.files[0].type.split("/")[0] == "image";
        const validTitle = modalePage2TextArea.value.trim().length > 1;
        const validCategory = modalePage2Select.value;
        console.log(validImage, validTitle, validCategory);
        return validImage && validTitle && validCategory;
    }

    function updateSubmitButton() {
        if (allFieldsAreFilled()) {
            submitButton.disabled = false;
            submitButton.style.backgroundColor = "#1D6154";
        } else {
            submitButton.disabled = true;
            submitButton.style.backgroundColor = null;
        }
    }
}
