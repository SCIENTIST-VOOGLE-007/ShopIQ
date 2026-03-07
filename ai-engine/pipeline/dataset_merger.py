import pandas as pd
import os

from dataset_normalizer import (
    normalize_amazon,
    normalize_olist,
    normalize_retailrocket,
    normalize_instacart
)


BASE_PATH = "ai-engine/data"


def load_datasets():

    amazon_path = os.path.join(BASE_PATH, "cleaned/amazon_cleaned.csv")
    olist_path = os.path.join(BASE_PATH, "cleaned/olist_cleaned.csv")
    retailrocket_path = os.path.join(BASE_PATH, "cleaned/retailrocket_cleaned.csv")
    instacart_path = os.path.join(BASE_PATH, "cleaned/instacart_cleaned.csv")

    datasets = {}

    if os.path.exists(amazon_path):
        datasets["amazon"] = pd.read_csv(amazon_path)

    if os.path.exists(olist_path):
        datasets["olist"] = pd.read_csv(olist_path)

    if os.path.exists(retailrocket_path):
        datasets["retailrocket"] = pd.read_csv(retailrocket_path)

    if os.path.exists(instacart_path):
        datasets["instacart"] = pd.read_csv(instacart_path)

    return datasets


def normalize_datasets(datasets):

    normalized = []

    if "amazon" in datasets:
        normalized.append(normalize_amazon(datasets["amazon"]))

    if "olist" in datasets:
        normalized.append(normalize_olist(datasets["olist"]))

    if "retailrocket" in datasets:
        normalized.append(normalize_retailrocket(datasets["retailrocket"]))

    if "instacart" in datasets:
        normalized.append(normalize_instacart(datasets["instacart"]))

    return normalized


def merge_datasets(normalized_dfs):

    merged = pd.concat(normalized_dfs, ignore_index=True)

    merged.drop_duplicates(subset=["product_id", "title"], inplace=True)

    merged.fillna("", inplace=True)

    return merged


def save_dataset(df):

    output_path = os.path.join(BASE_PATH, "merged/unified_products.csv")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    df.to_csv(output_path, index=False)

    print("Unified dataset saved to:", output_path)


def main():

    print("Loading cleaned datasets...")

    datasets = load_datasets()

    print("Normalizing datasets...")

    normalized = normalize_datasets(datasets)

    print("Merging datasets...")

    merged = merge_datasets(normalized)

    print("Saving unified dataset...")

    save_dataset(merged)

    print("Dataset merging completed successfully")


if __name__ == "__main__":
    main()