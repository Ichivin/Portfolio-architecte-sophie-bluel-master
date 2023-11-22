function openModal(gallery) {
    const modaleContainer = document.getElementById("modale-container");
    modaleContainer.innerHTML = "";

    const modaleBackground = createHtmlElement("div", "modale-background", modaleContainer, "click", (e) => {
        if (e.target == modaleBackground) {
            modaleContainer.innerHTML = "";
        }
    });

    const modaleWhite = createHtmlElement("div", "modale-white", modaleBackground, null, null);

    const modalePage1 = createHtmlElement("div", "modale-page1", modaleWhite, null, null);

    const modaleClose = createHtmlElement("button", "modale-close", modalePage1, "click", () => {
        modaleContainer.innerHTML = "";
    });
    modaleClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    const modaleTitle = createHtmlElement("h2", "modale-title", modalePage1, null, null);
    modaleTitle.innerText = "Galerie photo";

    const modaleGallery = createHtmlElement("div", "modale-gallery", modalePage1, null, null);
    displayModalImages(gallery, modaleGallery);

    const addImage = createHtmlElement("button", "add-image", modalePage1, "click", () => {
        modalePage2.className = "modale-page2 modale-slide-left";
    });
    addImage.innerHTML = "Ajouter une photo";

    const modalePage2 = createHtmlElement("div", "modale-page2", modaleWhite, null, null);

    const modaleClose2 = createHtmlElement("button", "modale-close", modalePage2, "click", () => {
        modaleContainer.innerHTML = "";
    });
    modaleClose2.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    const modaleBack = createHtmlElement("button", "modale-back", modalePage2, "click", () => {
        modalePage2.className = "modale-page2";
    });
    modaleBack.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';

    const modaleTitle2 = createHtmlElement("h2", "modale-title2", modalePage2, null, null);
    modaleTitle2.innerText = "Ajout photo";

    const form = createHtmlElement("form", "modale-page2__form", modalePage2, null, null);

    const divAddImage = createHtmlElement("div", "modale-page2__div-add-image", form, null, null);
    divAddImage.innerHTML = '<i class="fa-regular fa-image modale-page2__icon"></i>';

    const inputFile = document.createElement("input");
    inputFile.name = "image";
    inputFile.type = "file";
    inputFile.setAttribute("id", "file");
    divAddImage.appendChild(inputFile);

    const inputFileLabel = createHtmlElement("label", "modale-page2__file", divAddImage, null, null);
    inputFileLabel.setAttribute("for", "file");
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

    const imagePreview = createHtmlElement("div", "modale-page2__image-preview", divAddImage, null, null);

    const imageSize = createHtmlElement("p", "modale-page2__image-size", divAddImage, null, null);
    imageSize.innerText = "jpg, png : 4mo max";

    const formFieldTitle = createHtmlElement("div", "form-field", form, null, null);
    formFieldTitle.name = "title";

    const titleLabel = createHtmlElement("label", "title-label", formFieldTitle, null, null);
    titleLabel.innerText = "Titre";
    titleLabel.setAttribute("for", "modale-page2__text-area");

    const modalePage2TextArea = createHtmlElement("input", "modale-page2__text-area", formFieldTitle, "change", () => {
        updateSubmitButton();
    });
    modalePage2TextArea.setAttribute("id", "modale-page2__text-area");

    const formFieldSelect = createHtmlElement("div", "form-field", form, null, null);

    const categoryLabel = createHtmlElement("label", "title-label", formFieldSelect, null, null);
    categoryLabel.innerText = "Catégorie";
    categoryLabel.setAttribute("for", "modale-page2__select");

    const modalePage2Select = createHtmlElement("select", "modale-page2__select", formFieldSelect, "change", () => {
        updateSubmitButton();
    });
    modalePage2Select.name = "category";
    modalePage2Select.setAttribute("id", "modale-page2__select");

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

    const modalePage2Line = createHtmlElement("div", "modale-page2__line", form, null, null);

    const submitButton = createHtmlElement("button", "submit-button", form, null, null);
    submitButton.innerText = "Valider";
    submitButton.disabled = true;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("image", inputFile.files[0]);
        data.append("title", modalePage2TextArea.value);
        data.append("category", modalePage2Select.value);

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Sophie_token")}`,
            },
            body: data,
        })
            .then((response) => response.json())
            .then((addedImage) => {
                if (addedImage.error) {
                    alert("Echec de l'ajout d'image");
                } else {
                    /*alert("Votre image a bien été ajoutée. ");*/
                    modaleWhite.style.display = "none";
                    modaleBackground.style.display = "none";
                    allImagesTable.push(addedImage);
                    const gallery = document.querySelector(".gallery");
                    displayImages(allImagesTable, gallery);
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
