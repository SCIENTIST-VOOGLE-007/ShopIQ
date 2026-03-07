import pandas as pd
import os

# -------------------------------
# Paths
# -------------------------------

DATASET_PATH = "datasets/amazon_reviews"
OUTPUT_PATH = "ai-engine/data/cleaned/amazon_cleaned.csv"

# -------------------------------
# Load datasets
# -------------------------------

def load_datasets():

    file1 = os.path.join(DATASET_PATH, "electronics_sample.csv")
    file2 = os.path.join(DATASET_PATH, "electronics_small.csv")

    df1 = pd.read_csv(file1)
    df2 = pd.read_csv(file2)

    print("Loaded Amazon datasets")

    return df1, df2


# -------------------------------
# Clean dataset
# -------------------------------

def clean_dataframe(df):

    df = df.copy()

    # Rename common Amazon columns if they exist
    column_mapping = {
        "reviewText": "review",
        "overall": "rating",
        "asin": "product_id",
        "summary": "title"
    }

    df.rename(columns=column_mapping, inplace=True)

    # Keep only useful columns if available
    keep_columns = ["product_id", "title", "rating", "review"]

    df = df[[c for c in keep_columns if c in df.columns]]

    # Remove missing reviews
    df.dropna(subset=["review"], inplace=True)

    # Fill missing titles
    if "title" in df.columns:
        df["title"] = df["title"].fillna("Unknown Product")

    # Fill ratings
    if "rating" in df.columns:
        df["rating"] = df["rating"].fillna(0)

    # Add metadata
    df["source"] = "amazon"
    df["category"] = "electronics"

    return df


# -------------------------------
# Merge datasets
# -------------------------------

def merge_datasets(df1, df2):

    combined = pd.concat([df1, df2], ignore_index=True)

    print("Merged Amazon datasets")

    return combined


# -------------------------------
# Save dataset
# -------------------------------

def save_dataset(df):

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    df.to_csv(OUTPUT_PATH, index=False)

    print(f"Amazon cleaned dataset saved → {OUTPUT_PATH}")


# -------------------------------
# Main
# -------------------------------

def main():

    df1, df2 = load_datasets()

    df1 = clean_dataframe(df1)
    df2 = clean_dataframe(df2)

    merged = merge_datasets(df1, df2)

    save_dataset(merged)


if __name__ == "__main__":
    main()