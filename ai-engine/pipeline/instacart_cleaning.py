import pandas as pd
import os


BASE_PATH = "datasets/instacart"
OUTPUT_PATH = "ai-engine/data/cleaned/instacart_cleaned.csv"


def load_data():
    print("Loading Instacart datasets...")

    products = pd.read_csv(os.path.join(BASE_PATH, "products.csv"))
    departments = pd.read_csv(os.path.join(BASE_PATH, "departments.csv"))
    aisles = pd.read_csv(os.path.join(BASE_PATH, "aisles.csv"))

    return products, departments, aisles


def merge_tables(products, departments, aisles):

    print("Merging products with aisles...")

    df = products.merge(aisles, on="aisle_id", how="left")

    print("Merging with departments...")

    df = df.merge(departments, on="department_id", how="left")

    return df


def clean_dataset(df):

    print("Cleaning Instacart dataset...")

    df = df.rename(columns={
        "product_name": "product_name",
        "department": "department",
        "aisle": "aisle"
    })

    df["product_name"] = df["product_name"].astype(str).str.strip()

    df["department"] = df["department"].fillna("unknown")
    df["aisle"] = df["aisle"].fillna("unknown")

    df.drop_duplicates(subset=["product_id"], inplace=True)

    cleaned = df[[
        "product_id",
        "product_name",
        "department",
        "aisle"
    ]]

    return cleaned


def save_dataset(df):

    os.makedirs("../data/cleaned", exist_ok=True)

    df.to_csv(OUTPUT_PATH, index=False)

    print("Instacart cleaned dataset saved at:", OUTPUT_PATH)


def main():

    products, departments, aisles = load_data()

    merged = merge_tables(products, departments, aisles)

    cleaned = clean_dataset(merged)

    save_dataset(cleaned)


if __name__ == "__main__":
    main()