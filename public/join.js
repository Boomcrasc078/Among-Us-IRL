socket = io();
const joinLobbyMenuElement = document.getElementById("joinLobbyMenu");
const loadingElement = document.getElementById("loading");
const loadingTextElement = document.getElementById("loading-text");
const errorScreenwElement = document.getElementById("error");
const errorTextElement = document.getElementById("error-text");
joinLobbyMenuElement.style.display = "block";

function joinLobby() {
	joinLobbyMenuElement.style.display = "none";
	loadingScreen(true, "Ansluter till spelet...");
	
	const lobbyCodeInputElement = document.getElementById("lobbyCodeInput").value;
	socket
	.timeout(5000)
	.emit("join-lobby", lobbyCodeInputElement, (err, response) => {
		if (err) {
			console.log(`Error joining lobby: ${err}`);
		} else if (response.status) {
			console.log(`Joined lobby successfully: ${response.lobbyName}`);
			
			
		} else {
			console.log(`Failed to join lobby: ${response.message}`);
			errorScreen(true, response.message);
		}
	});
	
	loadingScreen(false);
}

function loadingScreen(enable, message) {
	if (enable) {
		loadingElement.style.display = "block";
		loadingTextElement.textContent = message;
	} else {
		loadingElement.style.display = "none";
		loadingTextElement.textContent = "Laddar...";
	}
}

function errorScreen(enable, message) {
	if (enable) {
		errorScreenwElement.style.display = "block";
		errorTextElement.textContent = message;
	} else {
		errorScreenwElement.style.display = "none";
		errorTextElement.textContent = "";
	}
}
