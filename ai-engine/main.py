import faiss
import pandas as pd
import numpy as np

from models.ollama_client import ask_llm
from modules.recommender import recommend_products
from modules.comparator import compare_products
from modules.review_summarizer import summarize_reviews
from modules.profile_builder import build_user_profile



# Load dataset
DATA_PATH = "ai-engine/data/merged/unified_products.csv"

df = pd.read_csv(DATA_PATH)



# Load FAISS index
INDEX_PATH = "ai-engine/vectorstore/product_index.faiss"

index = faiss.read_index(INDEX_PATH)



# Load embeddings
EMBEDDINGS_PATH = "ai-engine/vectorstore/product_embeddings.npy"

product_embeddings = np.load(EMBEDDINGS_PATH)



# -----------------------------
# SEARCH PRODUCTS
# -----------------------------

def search_products(query_embedding, top_k=5):

    D, I = index.search(
        np.array([query_embedding]).astype("float32"),
        top_k
    )

    results = df.iloc[I[0]]

    return results.to_dict(orient="records")



# -----------------------------
# PROCESS USER QUERY
# -----------------------------

def process_query(user_message, user_history=None):

    # 1️⃣ Build user profile
    profile = build_user_profile(user_history)



    # 2️⃣ Convert query to embedding
    embedding_text = ask_llm(
        f"Convert this shopping query to a search embedding description: {user_message}"
    )



    # Temporary embedding vector
    # (real system would use embedding model)

    query_embedding = np.random.rand(384).astype("float32")



    # 3️⃣ Search products
    products = search_products(query_embedding)



    # 4️⃣ Recommend best products
    recommendations = recommend_products(products, profile)



    # 5️⃣ Compare products
    comparison = compare_products(recommendations)



    # 6️⃣ Review summary
    review_summary = summarize_reviews(recommendations)



    # 7️⃣ AI explanation
    reasoning_prompt = f"""
User Query: {user_message}

Products Found:
{recommendations}

Explain simply which product fits the user best and why.
"""

    explanation = ask_llm(reasoning_prompt)



    return {

        "products": recommendations,
        "comparison": comparison,
        "review_summary": review_summary,
        "explanation": explanation

    }



# -----------------------------
# API ENTRYPOINT
# -----------------------------

def assistant_response(message):

    result = process_query(message)

    return result



# CLI testing
if __name__ == "__main__":

    query = input("Ask ShopIQ: ")

    response = assistant_response(query)

    print(response)