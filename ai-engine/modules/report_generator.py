from models.ollama_client import OllamaClient
import json


class ReportGenerator:

    def __init__(self):
        self.client = OllamaClient()


    def generate_comparison_report(self, products, user_profile=None):
        """Generate a detailed comparison report for products"""
        
        # Build product summary
        product_list = ""
        for idx, prod in enumerate(products, 1):
            product_list += f"\n{idx}. {prod.get('name', 'Unknown')} - ₹{prod.get('price', 'N/A')}"
            if 'rating' in prod:
                product_list += f" (Rating: {prod['rating']}/5)"
        
        # Build user context
        user_context = ""
        if user_profile:
            user_context = f"""
User Profile Context:
- Budget: ₹{user_profile.get('budgetRange', {}).get('min')} - ₹{user_profile.get('budgetRange', {}).get('max')}
- Age: {user_profile.get('ageGroup', 'N/A')}
- Interests: {', '.join(user_profile.get('interests', []))}
"""
        
        prompt = f"""
Create a professional shopping comparison report.

Products to Compare:{product_list}

{user_context}

Provide:
1. Brief product summary (2-3 lines each)
2. Pros and cons for each
3. Which product is best for different user types
4. Final recommendation with reasoning
5. Key factors to consider in your decision

Format clearly and be concise.
"""

        try:
            analysis = self.client.generate(prompt)
            return {
                "status": "success",
                "analysis": analysis,
                "products": products,
                "report_type": "comparison"
            }
        except Exception as e:
            return {
                "status": "limited",
                "analysis": self._fallback_comparison(products),
                "products": products,
                "error": str(e)
            }
    
    def generate_activity_report(self, user_activity):
        """Generate shopping activity report"""
        prompt = f"""
Create a personalised shopping intelligence report.

User Activity Summary:
{user_activity}

Include insights on:
- Spending patterns
- Preferred categories
- Quality vs price preferences
- Recommendations for future purchases
"""
        
        try:
            report = self.client.generate(prompt)
            return {"status": "success", "report": report}
        except:
            return {"status": "error", "report": "Could not generate report"}
    
    def _fallback_comparison(self, products):
        """Fallback comparison when AI is unavailable"""
        if not products:
            return "No products to compare."
        
        comparison = "Product Comparison:\n\n"
        for i, prod in enumerate(products, 1):
            name = prod.get('name', 'Product')
            price = prod.get('price', 'N/A')
            rating = prod.get('rating', 'N/A')
            comparison += f"{i}. {name}\n   Price: ₹{price} | Rating: {rating}/5\n\n"
        
        comparison += "💡 Tip: Compare by price, rating, and your specific needs.\n"
        return comparison


# Convenience functions for API
def generate_report(products, profile=None):
    """Generate a detailed product comparison report"""
    generator = ReportGenerator()
    return generator.generate_comparison_report(products, profile)

def generate_activity_report(user_activity):
    """Generate user activity analysis report"""
    generator = ReportGenerator()
    return generator.generate_activity_report(user_activity)
