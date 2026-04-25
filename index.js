const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

const API_BASE = "http://localhost:8080";

function showMessage(text, isSuccess) {
	loginMessage.textContent = text;
	loginMessage.classList.toggle("text-success", isSuccess);
	loginMessage.classList.toggle("text-danger", !isSuccess);
}

loginForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const username = usernameInput.value.trim();
	const password = passwordInput.value;

	try {
		const response = await fetch(`${API_BASE}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			const user = await response.json();
			sessionStorage.setItem("authUser", user.username);
			sessionStorage.setItem("authRole", user.role || "resto");

			showMessage("Login exitoso. Bienvenido.", true);
			setTimeout(() => {
				window.location.href = "inicio.html";
			}, 600);
			return;
		}

		showMessage("Usuario o password incorrectos.", false);
	} catch (error) {
		showMessage("Error al conectar con el servidor.", false);
		console.error(error);
	}
});

