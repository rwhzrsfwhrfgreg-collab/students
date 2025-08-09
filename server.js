const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');

const app = express();
const port = 3000;

// --- Middleware ---
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Multer Configuration ---
// Store files in memory to be processed
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed!"), false);
        }
    }
});

// --- In-Memory Data Store ---
// A simple variable to store the text from the last uploaded PDF.
// Note: This is not suitable for a multi-user environment.
let documentText = "";

// --- Routes ---

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: 'No file was uploaded.' });
    }

    try {
        const dataBuffer = req.file.buffer;
        const data = await pdfParse(dataBuffer);
        documentText = data.text; // Store the extracted text
        res.json({ success: true, message: `File "${req.file.originalname}" uploaded and processed successfully.` });
    } catch (error) {
        console.error('Error parsing PDF:', error);
        res.status(500).json({ success: false, error: 'Failed to process the PDF file.' });
    }
});

// Handle chat messages
app.post('/chat', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    if (!documentText) {
        return res.status(400).json({ reply: 'I cannot answer questions until you upload a document. Please upload a PDF file first.' });
    }

    // Mock AI Response
    const aiReply = `This is a mock AI response. You asked: "${message}". Based on the document you uploaded, I would provide a detailed answer here.`;
    res.json({ reply: aiReply });
});

// --- Server ---
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
