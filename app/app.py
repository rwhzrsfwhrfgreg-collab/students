import os
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the uploads directory if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filename = file.filename
        # Note: In a real app, you should secure the filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'filename': filename})
    return jsonify({'error': 'File upload failed'}), 500

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message')
    filename = data.get('filename')

    if not message or not filename:
        return jsonify({'error': 'Message or filename missing'}), 400

    try:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            document_content = f.read()

        # Mock AI response
        # In a real app, you would process the document_content and message
        # with an AI model.
        reply = f"I have received your message: '{message}'. I should be analyzing the document '{filename}', but I am a mock AI."

        return jsonify({'reply': reply})
    except FileNotFoundError:
        return jsonify({'error': 'File not found. Please upload the file again.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
