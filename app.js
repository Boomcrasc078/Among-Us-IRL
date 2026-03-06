import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import Lobby from "./Lobby.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(join(__dirname, "public/index.html"));
});

let lobbys = [];

io.on("connection", (socket) => {
	console.log(`Socket ${socket.id} has been connected`);
	socket.on("disconnect", (reason) => {
		console.log(`Socket ${socket.id} has been disconnected: ${reason}`);
    if (reason === "transport close") {
      closeLobbysHosted(socket);
		}
	});

	socket.on("host-lobby", (callback) => {
		let newLobby = new Lobby(socket);
		lobbys.push(newLobby);
		console.log(`Socket ${socket.id} has hosted a new lobby`);
		callback({ status: true, lobbyName: newLobby.name });
	});

	socket.on("join-lobby", (lobbyName, callback) => {
		const lobby = lobbys.find((lobby) => lobby.name === lobbyName);
		if (lobby) {
			callback({ status: true, lobbyName: lobby.name });
		} else {
			callback({ status: false, message: "Lobby not found" });
		}
		lobby
	});
});

function update() {}

setInterval(update, 15);

server.listen(3000, () => {
	console.log("server running at http://localhost:3000");
});

// function closeLobbysHosted(socket) {
//   let closeLobbys = lobbys.filter((lobby) => lobby.host === socket);
//   closeLobbys.forEach((lobby) => { 
    
//     });
//     lobbys = lobbys.filter((l) => l !== lobby);
//   });
//   console.log(`Socket ${socket.id} has been removed from lobbies`);
// }
