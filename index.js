const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

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
		const response = await fetch("users.json", { cache: "no-store" });

		if (!response.ok) {
			throw new Error("No se pudo cargar users.json");
		}

		const users = await response.json();
		const matchedUser = users.find(
			(user) => user.username === username && user.password === password
		);

		if (matchedUser) {
			sessionStorage.setItem("authUser", matchedUser.username);
			sessionStorage.setItem("authRole", matchedUser.role || "resto");

			showMessage("Login exitoso. Bienvenido.", true);
			setTimeout(() => {
				window.location.href = "inicio.html";
			}, 600);
			return;
		}

		showMessage("Usuario o password incorrectos.", false);
	} catch (error) {
		showMessage("Error al validar usuario. Revisa users.json.", false);
		console.error(error);
	}
});
