from models.ollama_client import OllamaClient


class ReportGenerator:

    def __init__(self):
        self.client = OllamaClient()


    def generate_report(self, user_activity):

        prompt = f"""
Create a shopping intelligence report.

User activity:
{user_activity}

Include:
- spending patterns
- most purchased categories
- product quality trends
- improvement suggestions
"""

        return self.client.generate(prompt)