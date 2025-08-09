document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const uploadButton = document.getElementById('upload-button');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    // --- Event Listeners ---

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!fileInput.files || fileInput.files.length === 0) {
            appendMessage('Please select a PDF file to upload.', 'system');
            return;
        }

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        // Disable form and show loading state
        uploadButton.disabled = true;
        uploadButton.textContent = 'Uploading...';

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                appendMessage(result.message, 'system');
                // Enable chat
                messageInput.disabled = false;
                sendButton.disabled = false;
                messageInput.focus();
            } else {
                throw new Error(result.error || 'Upload failed.');
            }
        } catch (error) {
            appendMessage(`Error: ${error.message}`, 'system');
        } finally {
            // Re-enable form
            uploadButton.disabled = false;
            uploadButton.textContent = 'Upload';
        }
    });

    sendButton.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevents adding a new line
            handleSendMessage();
        }
    });

    // --- Functions ---

    async function handleSendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        appendMessage(message, 'user');
        messageInput.value = '';
        sendButton.disabled = true; // Disable until response arrives

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const result = await response.json();
            appendMessage(result.reply, 'ai');

        } catch (error) {
            appendMessage('Sorry, something went wrong. Please try again.', 'ai');
        } finally {
            sendButton.disabled = false;
            messageInput.focus();
        }
    }

    function appendMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
    }
});
