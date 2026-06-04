import json

from langchain.schema import Document

from langchain_community.vectorstores import FAISS

from langchain_community.embeddings import HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

with open("chatbotdata.json", "r", encoding="utf-8") as f:
    data = json.load(f)

documents = []

for section in data:

    for item in section["content"]:

        text = item.get("paragraph", "")

        metadata = {
            "heading": item.get("heading"),
            "section": section.get("section_title"),
            "topic": item.get("metadata", {}).get("topic")
        }

        documents.append(
            Document(
                page_content=text,
                metadata=metadata
            )
        )

vectorstore = FAISS.from_documents(
    documents,
    embedding_model
)

vectorstore.save_local("vectorstore")

print("Vector database created successfully.")