import pandas as pd
import os

# -------------------------------
# Paths
# -------------------------------

DATASET_PATH = "datasets/brazil_ecommerce"
OUTPUT_PATH = "ai-engine/data/cleaned/olist_cleaned.csv"


# -------------------------------
# Load datasets
# -------------------------------

def load_datasets():

    products = pd.read_csv(os.path.join(DATASET_PATH, "olist_products_dataset.csv"))
    order_items = pd.read_csv(os.path.join(DATASET_PATH, "olist_order_items_dataset.csv"))
    orders = pd.read_csv(os.path.join(DATASET_PATH, "olist_orders_dataset.csv"))
    reviews = pd.read_csv(os.path.join(DATASET_PATH, "olist_order_reviews_dataset.csv"))
    sellers = pd.read_csv(os.path.join(DATASET_PATH, "olist_sellers_dataset.csv"))
    category_translation = pd.read_csv(os.path.join(DATASET_PATH, "product_category_name_translation.csv"))

    print("Loaded Olist datasets")

    return products, order_items, orders, reviews, sellers, category_translation


# -------------------------------
# Data merging
# -------------------------------

def merge_datasets(products, order_items, orders, reviews, sellers, category_translation):

    # Translate category names
    products = products.merge(
        category_translation,
        on="product_category_name",
        how="left"
    )

    # Merge order_items with products
    df = order_items.merge(products, on="product_id", how="left")

    # Merge orders
    df = df.merge(orders, on="order_id", how="left")

    # Merge reviews
    df = df.merge(reviews, on="order_id", how="left")

    # Merge sellers
    df = df.merge(sellers, on="seller_id", how="left")

    print("Merged Olist relational tables")

    return df


# -------------------------------
# Clean dataset
# -------------------------------

def clean_dataset(df):

    df = df.copy()

    # Rename columns
    df.rename(columns={
        "product_category_name_english": "category",
        "review_score": "rating",
        "review_comment_message": "review"
    }, inplace=True)

    # Create product title if missing
    df["title"] = df["category"].fillna("Unknown Product")

    # Keep useful columns
    columns = [
        "product_id",
        "title",
        "category",
        "price",
        "rating",
        "review",
        "seller_id"
    ]

    df = df[[c for c in columns if c in df.columns]]

    # Fill missing values
    df["rating"] = df["rating"].fillna(0)
    df["review"] = df["review"].fillna("")

    # Add metadata
    df["source"] = "olist"

    # Remove duplicates
    df.drop_duplicates(inplace=True)

    return df


# -------------------------------
# Save dataset
# -------------------------------

def save_dataset(df):

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    df.to_csv(OUTPUT_PATH, index=False)

    print(f"Olist cleaned dataset saved → {OUTPUT_PATH}")


# -------------------------------
# Main
# -------------------------------

def main():

    products, order_items, orders, reviews, sellers, category_translation = load_datasets()

    merged = merge_datasets(
        products,
        order_items,
        orders,
        reviews,
        sellers,
        category_translation
    )

    cleaned = clean_dataset(merged)

    save_dataset(cleaned)


if __name__ == "__main__":
    main()