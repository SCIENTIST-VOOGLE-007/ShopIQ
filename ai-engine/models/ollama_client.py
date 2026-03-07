import requests


OLLAMA_BASE_URL = "http://localhost:11434/api"

LLM_MODEL = "llama3"
EMBED_MODEL = "nomic-embed-text"


class OllamaClient:

    def __init__(self):
        self.generate_url = f"{OLLAMA_BASE_URL}/generate"
        self.embedding_url = f"{OLLAMA_BASE_URL}/embeddings"


    def generate(self, prompt, temperature=0.2):

        payload = {
            "model": LLM_MODEL,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": temperature
            }
        }

        try:

            response = requests.post(self.generate_url, json=payload)

            if response.status_code != 200:
                raise Exception("Ollama generation failed")

            data = response.json()

            return data["response"]

        except Exception as e:
            print("Ollama Error:", str(e))
            return "AI generation failed."


    def embed(self, text):

        payload = {
            "model": EMBED_MODEL,
            "prompt": text
        }

        try:

            response = requests.post(self.embedding_url, json=payload)

            if response.status_code != 200:
                raise Exception("Embedding failed")

            data = response.json()

            return data["embedding"]

        except Exception as e:
            print("Embedding Error:", str(e))
            return None


# Convenience function for easy LLM queries
def ask_llm(prompt, temperature=0.2):
    """Convenience function to ask the LLM a question"""
    client = OllamaClient()
    return client.generate(prompt, temperature)