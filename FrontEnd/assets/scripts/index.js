const divImage = document.getElementById("gallery");
const filterTous = document.querySelector(".filter-button");

let images = [];
let filterImages = [];

fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        images = data;
        displayImages(images, divImage);
        filterImages = images;
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
                filterImages = images.filter((image) => {
                    return image.categoryId == category.id;
                });
                displayImages(filterImages, divImage);
            });
            li.appendChild(button);
            filterList.appendChild(li);
        });
        filterTous.addEventListener("click", () => {
            displayImages(images, divImage);
        });
    });

if (localStorage.getItem("Sophie_token")) {
    const button = document.createElement("button");
    button.innerText = "Modifier";
    button.className = "edit-button";
    document.getElementById("project-title").appendChild(button);
    button.addEventListener("click", () => {
        openModale(images);
    });
}
