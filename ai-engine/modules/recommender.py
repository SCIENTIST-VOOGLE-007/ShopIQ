import faiss
import pandas as pd
import numpy as np
import os

from models.ollama_client import OllamaClient


DATA_PATH = "ai-engine/data/merged/unified_products.csv"
INDEX_PATH = "ai-engine/vectorstore/product_index.faiss"


class Recommender:

    def __init__(self):

        self.client = OllamaClient()

        if not os.path.exists(DATA_PATH):
            raise Exception("Merged dataset not found")

        if not os.path.exists(INDEX_PATH):
            raise Exception("FAISS index not found")

        self.df = pd.read_csv(DATA_PATH)

        self.index = faiss.read_index(INDEX_PATH)


    def recommend(self, user_query, top_k=5):

        embedding = self.client.embed(user_query)

        query_vector = np.array([embedding]).astype("float32")

        distances, indices = self.index.search(query_vector, top_k)

        results = []

        for i in indices[0]:
            if i < len(self.df):
                results.append(self.df.iloc[i].to_dict())

        return results


# Convenience function for product recommendations
def recommend_products(products, profile, top_k=3):
    """Recommend products based on user profile and search results"""
    recommender = Recommender()
    
    # For now, just return the top products from search
    # In a full implementation, this would filter based on profile
    return products[:top_k]