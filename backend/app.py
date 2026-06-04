from flask import Flask, request, jsonify
from flask_cors import CORS
from rag_pipeline import ask_chatbot

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    query = data.get("message", "").strip()
    history = data.get("history", [])  # conversation history from frontend

    if not query:
        return jsonify({"response": "Please send a message! 🌸"}), 400

    response = ask_chatbot(query, history)
    return jsonify({"response": response})

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "bot": "Bloom - Twistnbloom AI"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
