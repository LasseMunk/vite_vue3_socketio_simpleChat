<template>
	<div class="file-reader">
		<h2>Text File Reader</h2>
		<input type="file" accept=".txt" @change="handleFileUpload" />
		<div v-if="fileContent" class="file-content">
			<h3>File Content:</h3>
			<button @click="copyToClipboard">Copy to Clipboard</button>
			<pre>{{ fileContent }}</pre>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const fileContent = ref(""); // Holds the content of the .txt file

const copyToClipboard = () => {
    navigator.clipboard.writeText(fileContent.value).catch(err => {
        console.error("Failed to copy text: ", err);
    });
};

const handleFileUpload = (event) => {
    console.log(event);
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (e) => {
            fileContent.value = e.target.result; // Set the file content
        };
        reader.readAsText(file); // Read the file as text
    } else {
        alert("Please upload a valid .txt file.");
    }
};
</script>
