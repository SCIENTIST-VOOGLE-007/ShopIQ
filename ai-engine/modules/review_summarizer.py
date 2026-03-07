from models.ollama_client import OllamaClient


class ReviewSummarizer:

    def __init__(self):
        self.client = OllamaClient()


    def summarize(self, reviews):

        prompt = f"""
Summarize the following product reviews.

Reviews:
{reviews}

Return:
- overall sentiment
- common pros
- common cons
- final recommendation
"""

        return self.client.generate(prompt)


# Convenience function for review summarization
def summarize_reviews(reviews):
    """Summarize product reviews"""
    summarizer = ReviewSummarizer()
    return summarizer.summarize(reviews)