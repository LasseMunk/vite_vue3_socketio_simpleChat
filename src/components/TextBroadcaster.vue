<template>
	<div>
		<input v-model="message" @input="sendMessage" type="text" placeholder="Type your message" />
		<p>Received Message: {{ receivedMessage }}</p>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';

const message = ref('');
const receivedMessage = ref('');
let socket = null;

// Connect to the Socket.IO server
onMounted(() => {
  socket = io('http://localhost:3000'); // Match your server's URL and port

  socket.on('connect', () => {
    console.log('Connected to WebSocket server:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server.');
  });

  // Listen for incoming messages
  socket.on('message-received', (msg) => {
    receivedMessage.value = msg;
  });
});

// Broadcast the message when the input changes
const sendMessage = () => {
  if (socket) {
    socket.emit('broadcast-message', message.value);
  }
};

// Clean up the socket connection when the component is destroyed
onUnmounted(() => {
  if (socket) {
    socket.disconnect();
  }
});
</script>

<style scoped>
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  display: block;
}
</style>
