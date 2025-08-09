# AI Student App (MVP)

This is a proof-of-concept for an AI-powered application for students. This initial version (MVP) allows users to upload a text document and have a conversation with an AI about its contents.

## Features

*   Upload a text file (`.txt`, `.md`, etc.).
*   Chat with a (mock) AI about the uploaded document.

## How to Run

1.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

2.  **Run the Flask application:**

    ```bash
    python app/app.py
    ```

3.  **Open your browser:**

    Navigate to `http://127.0.0.1:5000` to use the application.

## Project Structure

*   `app/`: Contains the Flask application.
    *   `app.py`: The main Flask application file.
    *   `static/`: Contains static files (CSS, JavaScript).
    *   `templates/`: Contains HTML templates.
    *   `uploads/`: Where uploaded files are stored.
*   `requirements.txt`: A list of Python dependencies.
*   `README.md`: This file.
