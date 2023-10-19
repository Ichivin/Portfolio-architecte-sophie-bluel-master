const divImage = document.getElementById("gallery")
fetch("http://localhost:5678/api/works").then(response => response.json()).then(images => {
    images.forEach((image) => { 
        console.log(image)
        const figure = document.createElement("figure")
        const figCaption = document.createElement("figcaption")
        const figImage = document.createElement("img")

        figImage.alt = image.title
        figImage.src = image.imageUrl
        figCaption.textContent = image.title
        divImage.appendChild(figure);
        figure.appendChild(figImage);
        figure.appendChild(figCaption);
    })
});