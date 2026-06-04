import os
from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from prompts import SYSTEM_PROMPT

load_dotenv()

api_key = os.getenv("NVIDIA_API_KEY")

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = FAISS.load_local(
    "vectorstore",
    embedding_model,
    allow_dangerous_deserialization=True
)

retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct",
    api_key=api_key,
    temperature=0.3
)

def ask_chatbot(query, history=None):
    """
    query   : current user message (str)
    history : list of {"role": "user"|"assistant", "text": "..."} dicts
    """

    # Build conversation history string
    history_text = ""
    if history:
        for turn in history[-6:]:  # last 6 turns to stay within context limits
            role = "Customer" if turn["role"] == "user" else "Bloom"
            history_text += f"{role}: {turn['text']}\n"

    # Retrieve relevant docs based on the current query
    docs = retriever.invoke(query)
    context = "\n\n".join([doc.page_content for doc in docs])

    # Build full prompt
    final_prompt = f"""{SYSTEM_PROMPT}

---
CONTEXT (from Twistnbloom knowledge base):
{context}

---
CONVERSATION HISTORY:
{history_text if history_text else "(This is the start of the conversation)"}

---
Customer: {query}
Bloom:"""

    response = llm.invoke(final_prompt)
    return response.content.strip()
