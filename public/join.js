const socket = io();

let localPlayer = { name: null, id: null };

let localJoinedLobby = { name: null };

const joinLobbyMenuElement = document.getElementById('joinLobbyMenu');

const errorScreenwElement = document.getElementById('error');
const errorTextElement = document.getElementById('error-text');

joinLobbyMenuElement.style.display = 'block';

function joinLobby() {
	joinLobbyMenuElement.style.display = 'none';
	loadingScreen(true, 'Ansluter till spelet...');

	getLobbyCode();

	getPlayerName();

	socket.timeout(5000).emit('join-lobby', localJoinedLobby.name, localPlayer, (err, response) => {
		loadingScreen(false);
		if (err) {
			console.log(`Error joining lobby: ${err}`);
		} else if (response.status) {
			console.log(`Joined lobby successfully: ${response.lobbyName}`);
		} else {
			console.log(`Failed to join lobby: ${response.message}`);
			errorScreen(true, response.message);
		}
	});
}

function getLobbyCode() {
	const lobbyCodeInput = document.getElementById('lobbyCodeInput').value;
	localJoinedLobby.name = lobbyCodeInput;
}

function getPlayerName() {
	const playerNameInput = document.getElementById('nameInput').value;
	localPlayer.name = playerNameInput;
}

function errorScreen(enable, message) {
	if (enable) {
		errorScreenwElement.style.display = 'block';
		errorTextElement.textContent = message;
	} else {
		errorScreenwElement.style.display = 'none';
		errorTextElement.textContent = '';
	}
}
