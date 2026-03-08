const socket = io();

let localHostedLobby = {
	name: null,
	players: []
};

tryHostLobby();

function tryHostLobby() {
	socket.timeout(5000).emit("host-lobby", (err, response) => {
		if (err) {
			console.log(`Error hosting lobby: ${err}`);
		} else {
			hostLobby(response);
		}
	});
}

function hostLobby(response) {
	localHostedLobby.name = response.lobbyName;
	document.getElementById("lobbyCode").innerHTML = localHostedLobby.name;
	console.log(`Lobby hosted successfully: ${localHostedLobby.name}`);
	updateLobby();
}

function updateLobby() {
	socket.on("update-players", (players) => {
		localHostedLobby.players = players;
		updateTable();
	});
}
function updateTable() {
	const tableElement = document.getElementById("playersTableBody");
	let table = "";
	let i = 1;
	for (const player of localHostedLobby.players) {
		table += `<tr>
			<td scope="col">${i}</td>
			<td scope="col">${player.name}</td>
			</tr>`;
		i++;
	}
	tableElement.innerHTML = table;
}
