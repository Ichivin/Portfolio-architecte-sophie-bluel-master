const filterButtonAll = document.querySelector(".filter-button");
const loginButton = document.querySelector(".login");

let allImagesTable = [];
let filteredImagesTable = [];

fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        allImagesTable = [...data];
        displayImages(allImagesTable, galleryContainer);
        filteredImagesTable = [...allImagesTable];
    });

const filterList = document.getElementById("filter-list");
fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
        categories.forEach((category) => {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.className = "filter-button";
            button.innerText = category.name;
            button.addEventListener("click", () => {
                console.log(category.id);
                filteredImagesTable = allImagesTable.filter((image) => {
                    return image.categoryId == category.id;
                });
                displayImages(filteredImagesTable, galleryContainer);
            });
            li.appendChild(button);
            filterList.appendChild(li);
        });
        filterButtonAll.addEventListener("click", () => {
            displayImages(allImagesTable, galleryContainer);
        });
    });

if (localStorage.getItem("Sophie_token")) {
    const editBlock = document.querySelector(".edit-block");
    editBlock.style.display = "flex";
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>Modifier';
    editButton.className = "edit-button";
    document.getElementById("project-title").appendChild(editButton);
    loginButton.innerText = "logout";
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("Sophie_token");
        window.location.assign("./index.html");
    });
    editButton.addEventListener("click", () => {
        openModal(allImagesTable);
    });
}
