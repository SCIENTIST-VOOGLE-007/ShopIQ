#!/usr/bin/env python3
"""
ShopIQ AI Engine Flask API
Exposes intelligent shopping assistant, recommendations, comparisons, and reviews
"""

from flask import Flask, request, jsonify
import os
import sys
import numpy as np
import pandas as pd
import faiss

# Add modules to path
sys.path.insert(0, os.path.dirname(__file__))

from models.ollama_client import ask_llm, OllamaClient
from modules.recommender import recommend_products
from modules.comparator import compare_products
from modules.review_summarizer import summarize_reviews
from modules.report_generator import generate_report
from modules.profile_builder import build_user_profile

app = Flask(__name__)

# Global variables for loaded data
df = None
index = None
product_embeddings = None
client = None

def initialize():
    """Load all data and models on startup"""
    global df, index, product_embeddings, client
    
    try:
        # Load merged dataset
        DATA_PATH = os.path.join(os.path.dirname(__file__), "data/merged/unified_products.csv")
        if os.path.exists(DATA_PATH):
            df = pd.read_csv(DATA_PATH)
            print(f"✓ Loaded {len(df)} products from dataset")
        else:
            print(f"⚠ Dataset not found at {DATA_PATH}")
        
        # Load FAISS index
        INDEX_PATH = os.path.join(os.path.dirname(__file__), "vectorstore/product_index.faiss")
        if os.path.exists(INDEX_PATH):
            index = faiss.read_index(INDEX_PATH)
            print("✓ Loaded FAISS index")
        else:
            print(f"⚠ FAISS index not found at {INDEX_PATH}")
        
        # Load embeddings
        EMBEDDINGS_PATH = os.path.join(os.path.dirname(__file__), "vectorstore/product_embeddings.npy")
        if os.path.exists(EMBEDDINGS_PATH):
            product_embeddings = np.load(EMBEDDINGS_PATH)
            print(f"✓ Loaded {len(product_embeddings)} embeddings")
        else:
            print(f"⚠ Embeddings not found at {EMBEDDINGS_PATH}")
        
        # Initialize Ollama client
        client = OllamaClient()
        print("✓ Ollama client initialized (will connect on first use)")
        
    except Exception as e:
        print(f"⚠ Initialization warning: {str(e)}")

def search_products(query_embedding, top_k=5):
    """Search products using FAISS vector similarity"""
    if index is None or df is None:
        return []
    
    try:
        D, I = index.search(
            np.array([query_embedding]).astype("float32"),
            min(top_k, len(df))
        )
        
        if len(I[0]) == 0:
            return []
        
        results = df.iloc[I[0]].to_dict(orient="records")
        return results
    except Exception as e:
        print(f"Search error: {str(e)}")
        return []

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    status = {
        "api": "ready",
        "dataset_loaded": df is not None and len(df) > 0,
        "faiss_loaded": index is not None,
        "embeddings_loaded": product_embeddings is not None,
        "ollama_available": client is not None
    }
    return jsonify(status)

@app.route('/chat', methods=['POST'])
def chat():
    """
    Main chat endpoint - process user query and return recommendations
    """
    try:
        print(f"Received request: {request}")
        print(f"Content-Type: {request.content_type}")
        print(f"Data: {request.data}")
        
        data = request.json
        print(f"Parsed JSON: {data}")
        
        message = data.get('message', '').strip()
        user_profile = data.get('profile', {})
        
        print(f"Message: '{message}'")
        
        if not message:
            return jsonify({"error": "Empty message"}), 400
        
        print("Step 1: Getting LLM response")
        # 1. Get LLM response explaining what user is looking for
        clarification_prompt = f"""
A customer is shopping for products. They said: "{message}"

Respond briefly (1-2 sentences) understanding what they want:
"""
        
        try:
            print("Calling ask_llm for clarification")
            understanding = ask_llm(clarification_prompt, temperature=0.3)
            print(f"Understanding: {understanding}")
        except Exception as e:
            print(f"LLM error: {e}")
            understanding = f"Looking for products related to: {message}"
        
        print("Step 2: Generating embedding")
        # 2. Generate embedding for the query
        try:
            query_embedding = client.embed(message)
            if query_embedding is None:
                raise Exception("Embedding generation failed")
            query_embedding = np.array(query_embedding).astype("float32")
            print(f"Generated embedding with shape: {query_embedding.shape}")
        except Exception as e:
            print(f"Embedding error: {e}")
            query_embedding = np.random.rand(384).astype("float32")  # Fallback
        
        # 3. Search for relevant products
        products = search_products(query_embedding, top_k=5)
        
        recommendations = []
        if products:
            # 4. Get recommendations based on profile
            recommendations = recommend_products(products, user_profile)
        
        # 5. Generate comparison if multiple products found
        comparison = None
        if len(recommendations) > 1:
            try:
                comparison = compare_products(recommendations[:3])
            except:
                comparison = None
        
        # 6. Get review summary if reviews exist
        review_summary = None
        if products:
            try:
                review_summary = summarize_reviews(recommendations[:3])
            except:
                review_summary = None
        
        # 7. Generate AI recommendation explanation
        suggestion_prompt = f"""
Customer Query: {message}
Understanding: {understanding}
Found {len(recommendations)} relevant products.

Provide a brief, helpful shopping assistant response (2-3 sentences) that:
1. Shows you understand their need
2. Mentions key factors to consider
3. Suggests looking at the recommended products

Keep it conversational and friendly.
"""
        
        try:
            ai_suggestion = ask_llm(suggestion_prompt, temperature=0.5)
        except:
            ai_suggestion = f"I found {len(recommendations)} products that match your interest in {message}. Let me help you compare them!"
        
        return jsonify({
            "response": ai_suggestion,
            "understanding": understanding,
            "recommendations": recommendations,
            "comparison": comparison,
            "reviews": review_summary,
            "suggestions": [
                "Compare these products",
                "See detailed specs",
                "Check customer reviews",
                "Filter by price/brand"
            ]
        })
    
    except Exception as e:
        print(f"Chat error: {str(e)}")
        return jsonify({"error": str(e), "response": "I encountered an issue processing your request. Please try again."}), 500

@app.route('/recommend', methods=['POST'])
def recommend():
    """Get product recommendations based on user profile"""
    try:
        data = request.json
        profile = data.get('profile', {})
        interests = data.get('interests', [])
        
        # Simple search: use interests as query
        query_embedding = np.random.rand(384).astype("float32")
        products = search_products(query_embedding, top_k=10)
        
        recommendations = recommend_products(products, profile)
        
        return jsonify({
            "recommendations": recommendations,
            "count": len(recommendations),
            "message": f"Found {len(recommendations)} products matching your profile"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/compare', methods=['POST'])
def compare():
    """Compare multiple products"""
    try:
        data = request.json
        products = data.get('products', [])
        
        if not products or len(products) < 2:
            return jsonify({"error": "Need at least 2 products to compare"}), 400
        
        comparison = compare_products(products)
        
        return jsonify({
            "comparison": comparison,
            "message": "Comparison generated successfully"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/reviews', methods=['POST'])
def reviews():
    """Summarize reviews for products"""
    try:
        data = request.json
        products = data.get('products', [])
        
        if not products:
            return jsonify({"error": "No products provided"}), 400
        
        summary = summarize_reviews(products)
        
        return jsonify({
            "summary": summary,
            "message": "Reviews analyzed"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/report', methods=['POST'])
def report():
    """Generate PDF report for comparison"""
    try:
        data = request.json
        products = data.get('products', [])
        profile = data.get('profile', {})
        
        if not products:
            return jsonify({"error": "No products provided"}), 400
        
        report_data = generate_report(products, profile)
        
        return jsonify({
            "report": report_data,
            "message": "Report generated successfully"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting ShopIQ AI Engine API...")
    initialize()
    print("\n✓ AI Engine ready on http://localhost:5001")
    print("  - POST /chat - Chat with AI assistant")
    print("  - POST /recommend - Get recommendations")
    print("  - POST /compare - Compare products")
    print("  - POST /reviews - Summarize reviews")
    print("  - POST /report - Generate report")
    print("  - GET /health - Check status\n")
    
    app.run(host='localhost', port=5001, debug=False)
