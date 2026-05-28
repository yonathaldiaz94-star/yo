const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const mensaje = document.getElementById("mensaje");
function mostrarLogin() {
loginForm.style.display = "flex";
registerForm.style.display = "none";
}
function mostrarRegister() {
loginForm.style.display = "none";
registerForm.style.display = "flex";
}

registerForm.addEventListener("submit", function(e) {
e.preventDefault();
const usuario = document.getElementById("registerUser").value;
const email = document.getElementById("registerEmail").value;
const password = document.getElementById("registerPassword").value;
const user = {
usuario,
email,
password
};
localStorage.setItem("usuario", JSON.stringify(user));
mensaje.style.color = "green";
mensaje.textContent = "Usuario registrado correctamente";
registerForm.reset();
});


loginForm.addEventListener("submit", function(e) {
e.preventDefault();
const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;
const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
if(usuarioGuardado && email === usuarioGuardado.email && password ===
usuarioGuardado.password) {
mensaje.style.color = "green";
mensaje.textContent = "Login correcto";


window.location.href = "Pagina-Web.html";
} else {
mensaje.style.color = "red";
mensaje.textContent = "Correo o contraseña incorrectos";
}
});


