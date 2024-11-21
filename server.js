import { Server } from "socket.io";

const io = new Server(3000, {
	cors: {
		origin: "http://localhost:5174", // Vite default port
		methods: ["GET", "POST"],
	},
});

console.log("Socket.IO server running on http://localhost:3000");

io.on("connection", (socket) => {
	console.log("A client connected:", socket.id);

	socket.on("broadcast-message", (message) => {
		console.log(`Message from ${socket.id}:`, message);

		// Broadcast to all connected clients (excluding the sender)
		socket.broadcast.emit("message-received", message);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected:", socket.id);
	});
});
