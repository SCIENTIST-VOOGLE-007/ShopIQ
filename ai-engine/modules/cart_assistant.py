from models.ollama_client import OllamaClient


class CartAssistant:

    def __init__(self):
        self.client = OllamaClient()


    def analyze_cart(self, cart_items):

        prompt = f"""
You are a shopping optimization assistant.

Analyze this shopping cart:

{cart_items}

Suggest:
- cheaper alternatives
- bundle opportunities
- unnecessary items
- better product replacements
"""

        return self.client.generate(prompt)