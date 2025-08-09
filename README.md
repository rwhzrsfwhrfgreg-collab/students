# AI Student App (Node.js Version)

This is a proof-of-concept for an AI-powered application for students, built with Node.js and designed to be mobile-friendly. This version allows users to upload a PDF document (e.g., a textbook) and have a conversation with a mock AI about its contents.

## Features

*   **PDF Upload:** Upload a `.pdf` file.
*   **Text Extraction:** The server automatically extracts the text from the PDF.
*   **Mock Chat:** A chat interface to ask questions about the uploaded document. The AI responses are currently mocked.
*   **Mobile-First Design:** The interface is designed to be responsive and work well on mobile browsers.

## How to Run

To run this application, you need to have [Node.js](https://nodejs.org/) installed on your system.

1.  **Install Dependencies:**
    Open your terminal in the project directory and run the following command to install the necessary packages:
    ```bash
    npm install
    ```

2.  **Start the Server:**
    Once the installation is complete, start the server with this command:
    ```bash
    npm start
    ```
    (This runs the `node server.js` command defined in `package.json`).

3.  **Open the App:**
    Open your web browser and navigate to:
    [http://localhost:3000](http://localhost:3000)

The application should now be running and ready to use.
