import { Server } from "socket.io";

const io = new Server(3000, {
	cors: {
		origin: ["*"], // Allow both localhost and your local network IP
		methods: ["GET", "POST"],
		credentials: true,
	},
});

console.log("Socket.IO server running on http://localhost:3000");

io.on("connection", (socket) => {
	console.log("A client connected:", socket.id);
	console.log("number of connections", io.sockets.sockets.size);

	socket.on("broadcast-message", (message) => {
		console.log(`Message from ${socket.id}:`, message);

		// Broadcast to all connected clients (excluding the sender)
		socket.broadcast.emit("message-received", message);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected:", socket.id);
		console.log("number of connections", io.sockets.sockets.size);
	});
});
