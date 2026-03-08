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
def recommend_products(products, profile=None, top_k=3):
    """
    Recommend products based on user profile and search results.
    Scores products based on budget, interests, and other factors.
    """
    
    if not products:
        return []
    
    scored_products = []
    
    for prod in products:
        score = 0
        reasons = []
        
        # Budget matching (40 points)
        if profile:
            budget_range = profile.get('budgetRange', {})
            price = float(prod.get('price', 0) or 0)
            
            if budget_range:
                min_budget = float(budget_range.get('min', 0) or 0)
                max_budget = float(budget_range.get('max', 999999) or 999999)
                
                if min_budget <= price <= max_budget:
                    score += 40
                    reasons.append("Fits your budget")
                elif price < min_budget:
                    score += 20
                    reasons.append("Below your budget range")
        
        # Rating (20 points)
        rating = float(prod.get('rating', 0) or 0)
        if rating > 0:
            score += min(20, rating * 4)  # max 20 points
            if rating >= 4.5:
                reasons.append("Highly rated")
            elif rating >= 3.5:
                reasons.append("Good rating")
        
        # Interest matching (20 points)
        if profile and profile.get('interests'):
            category = str(prod.get('category', '')).lower()
            interests = [str(i).lower() for i in profile.get('interests', [])]
            
            if any(interest in category for interest in interests):
                score += 20
                reasons.append("Matches your interests")
        
        # Sustainability (10 points)
        if profile and profile.get('sustainability'):
            if prod.get('sustainable') or prod.get('eco_friendly'):
                score += 10
                reasons.append("Eco-friendly option")
        
        # Local support (10 points)
        if profile and profile.get('supportLocal'):
            if prod.get('local_brand') or prod.get('is_local'):
                score += 10
                reasons.append("Local/Small seller")
        
        scored_products.append({
            **prod,
            'score': min(100, score),
            'reasons': reasons if reasons else ["Good match for you"]
        })
    
    # Sort by score
    scored_products.sort(key=lambda x: x['score'], reverse=True)
    
    return scored_products[:top_k]
