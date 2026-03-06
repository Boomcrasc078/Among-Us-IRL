const socket = io();
let hostedLobby = null;
socket.timeout(5000).emit("host-lobby", (err, response) => {
	if (err) {
		console.log(`Error hosting lobby: ${err}`);
	} else {
		hostedLobby = response.lobbyName;
		console.log(`Lobby hosted successfully: ${hostedLobby}`);
        document.getElementById("lobbyCode").innerHTML = hostedLobby;
	}
});

