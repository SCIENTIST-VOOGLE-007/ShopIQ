import pandas as pd


def normalize_amazon(df):
    """Normalize Amazon dataset"""
    mapping = {
        "asin": "product_id",
        "title": "title",
        "category": "category",
        "price": "price",
        "overall": "rating",
        "reviewText": "review"
    }

    df = df.rename(columns=mapping)

    required = ["product_id", "title", "category", "price", "rating", "review"]
    df = df[[col for col in required if col in df.columns]]

    df["source"] = "amazon"

    return df


def normalize_olist(df):
    """Normalize Brazilian Olist dataset"""
    mapping = {
        "product_id": "product_id",
        "product_category_name": "category",
        "price": "price"
    }

    df = df.rename(columns=mapping)

    if "title" not in df.columns:
        df["title"] = df["category"]

    df["rating"] = None
    df["review"] = None
    df["source"] = "olist"

    cols = ["product_id", "title", "category", "price", "rating", "review", "source"]
    return df[cols]


def normalize_retailrocket(df):
    """Normalize RetailRocket dataset"""

    # product_id already exists from the cleaning script
    if "itemid" in df.columns:
        df["product_id"] = df["itemid"]

    df["title"] = "Unknown Product"
    
    # Keep category if it exists from cleaning, otherwise use general
    if "category" not in df.columns:
        df["category"] = "general"

    df["price"] = None
    df["rating"] = None
    df["review"] = None

    df["source"] = "retailrocket"

    cols = ["product_id", "title", "category", "price", "rating", "review", "source"]

    return df[cols]


def normalize_instacart(df):
    """Normalize Instacart dataset"""

    mapping = {
        "product_id": "product_id",
        "product_name": "title",
        "department": "category"
    }

    df = df.rename(columns=mapping)

    df["price"] = None
    df["rating"] = None
    df["review"] = None
    df["source"] = "instacart"

    cols = ["product_id", "title", "category", "price", "rating", "review", "source"]

    return df[cols]