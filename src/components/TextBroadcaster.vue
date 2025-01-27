<template>
	<div>
		<textarea v-model="message" @input="sendMessage" type="text" placeholder="Type your message" class="w-full h-16" />
		<div class="flex flex-row">
			<button @click="copyToClipboard" class="hover:text-red-500">Copy to Clipboard</button>
		</div>
		<hr />
		<p>{{ receivedMessage }}</p>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';

const message = ref('');
const receivedMessage = ref('');
let socket = null;

const copyToClipboard = () => {
    navigator.clipboard.writeText(receivedMessage.value).catch(err => {
        console.error("Failed to copy text: ", err);
    });
};

// Connect to the Socket.IO server
onMounted(() => {
  // socket = io('https://k7cbm6mr-3000.euw.devtunnels.ms/', {
  socket = io('http://localhost:3000/', {
    transports: ['websocket'],
    withCredentials: true,
    extraHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server:', socket.id );
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
