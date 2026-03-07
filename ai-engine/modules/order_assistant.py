from models.ollama_client import OllamaClient


class OrderAssistant:

    def __init__(self):
        self.client = OllamaClient()


    def order_help(self, order_details):

        prompt = f"""
Help the user understand their order.

Order details:
{order_details}

Explain:
- delivery timeline
- potential delays
- order tips
"""

        return self.client.generate(prompt)