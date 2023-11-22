const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.querySelector(".connexion");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(email.value);
    console.log(password.value);
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email: email.value, password: password.value }),
        headers: new Headers({
            accept: "application/json",
            "Content-Type": "application/json",
        }),
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
