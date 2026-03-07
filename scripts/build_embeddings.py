import os
import subprocess


EMBED_SCRIPT = "ai-engine/embeddings/embedding_generator.py"


def main():

    print("\n====================================")
    print("STARTING EMBEDDING GENERATION")
    print("====================================\n")

    if not os.path.exists(EMBED_SCRIPT):
        print("Embedding generator not found")
        return

    result = subprocess.run(["python", EMBED_SCRIPT])

    if result.returncode != 0:
        print("Embedding generation failed")
        return

    print("\n====================================")
    print("EMBEDDINGS BUILT SUCCESSFULLY")
    print("FAISS VECTOR DATABASE READY")
    print("====================================\n")


if __name__ == "__main__":
    main()