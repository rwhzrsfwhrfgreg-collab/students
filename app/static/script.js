document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const chatContainer = document.getElementById('chat-container');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    let uploadedFileName = '';

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            uploadedFileName = result.filename;
            appendMessage('System', `File "${uploadedFileName}" uploaded successfully. You can now ask questions about it.`);
        } else {
            appendMessage('System', `Error: ${result.error}`);
        }
    });

    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        if (message) {
            appendMessage('You', message);
            messageInput.value = '';

            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message, filename: uploadedFileName })
            });

            const result = await response.json();
            appendMessage('AI', result.reply);
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});
