# 🌸 Twistnbloom Chatbot — How to Run

## Prerequisites
- Python 3.10+
- Node.js 18+ and npm

---

## Step 1 — Set up the Backend

```bash
# Navigate to the backend folder
cd backend

# (Recommended) Create a virtual environment
python -m venv venv

# Activate it:
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Make sure your .env file has your NVIDIA API key:
# NVIDIA_API_KEY=your_key_here

# Start the Flask server
python app.py
```

✅ The backend will run at: http://127.0.0.1:5000

To verify it's working, open: http://127.0.0.1:5000/health
You should see: `{"status": "ok", "bot": "Bloom - Twistnbloom AI"}`

---

## Step 2 — Set up the Frontend

Open a **new terminal window** (keep the backend running):

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies (only needed once)
npm install

# Start the development server
npm run dev
```

✅ The frontend will run at: http://localhost:5173

Open that URL in your browser and start chatting with Bloom! 🌸

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `ModuleNotFoundError` | Run `pip install -r requirements.txt` again |
| CORS error in browser | Make sure backend is running on port 5000 |
| "Server error occurred" in chat | Check backend terminal for errors |
| Frontend won't start | Delete `node_modules` and run `npm install` again |
| NVIDIA API error | Check your `NVIDIA_API_KEY` in `.env` file |

---

## Project Structure

```
twistnbloom_enhanced/
├── backend/
│   ├── app.py            ← Flask API server
│   ├── prompts.py        ← Bloom's personality & instructions
│   ├── rag_pipeline.py   ← RAG logic (FAISS + LLM)
│   ├── chatbotdata.json  ← Business knowledge base
│   ├── vectorstore/      ← Pre-built FAISS index
│   ├── .env              ← Your NVIDIA API key
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx       ← Main chat UI (enhanced Twistnbloom theme)
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── HOW_TO_RUN.md         ← This file
```
