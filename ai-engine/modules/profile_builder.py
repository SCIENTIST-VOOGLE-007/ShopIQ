from models.ollama_client import OllamaClient


class ProfileBuilder:

    def __init__(self):
        self.client = OllamaClient()


    def build_profile(self, purchase_history):

        prompt = f"""
Analyze the user's shopping history.

History:
{purchase_history}

Identify:
- preferred product categories
- average budget
- brand preference
- shopping behaviour

Return a structured user shopping profile.
"""

        return self.client.generate(prompt)


# Convenience function for easy profile building
def build_user_profile(purchase_history):
    """Convenience function to build a user profile from purchase history"""
    builder = ProfileBuilder()
    return builder.build_profile(purchase_history)