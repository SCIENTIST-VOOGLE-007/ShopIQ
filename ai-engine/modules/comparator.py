from models.ollama_client import OllamaClient


class Comparator:

    def __init__(self):
        self.client = OllamaClient()


    def compare(self, products):

        prompt = f"""
You are a smart shopping assistant.

Compare the following products and explain which is better
based on price, rating, features and user value.

Products:
{products}

Give a short comparison and recommend the best option.
"""

        result = self.client.generate(prompt)

        return result


# Convenience function for product comparison
def compare_products(products):
    """Compare products and return comparison analysis"""
    comparator = Comparator()
    return comparator.compare(products)