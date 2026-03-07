import pandas as pd
import os


BASE_PATH = "datasets/retailrocket"
OUTPUT_PATH = "ai-engine/data/cleaned/retailrocket_cleaned.csv"


def load_data():

    print("Loading RetailRocket datasets...")

    events = pd.read_csv(os.path.join(BASE_PATH, "events.csv"))

    item_properties = pd.read_csv(
        os.path.join(BASE_PATH, "item_properties_part1.csv")
    )

    category_tree = pd.read_csv(
        os.path.join(BASE_PATH, "category_tree.csv")
    )

    return events, item_properties, category_tree


def extract_products(events):

    print("Extracting unique products...")

    products = events[["itemid"]].drop_duplicates()

    return products


def extract_categories(item_properties):

    print("Extracting product categories...")

    category_df = item_properties[item_properties["property"] == "categoryid"]

    category_df = category_df.rename(columns={
        "itemid": "product_id",
        "value": "category"
    })

    category_df = category_df[["product_id", "category"]]

    category_df.drop_duplicates(subset=["product_id"], inplace=True)

    return category_df


def merge_products(products, categories):

    print("Merging products with categories...")

    products = products.rename(columns={"itemid": "product_id"})

    df = products.merge(categories, on="product_id", how="left")

    df["category"] = df["category"].fillna("unknown")

    return df


def save_dataset(df):

    os.makedirs("../data/cleaned", exist_ok=True)

    df.to_csv(OUTPUT_PATH, index=False)

    print("RetailRocket cleaned dataset saved at:", OUTPUT_PATH)


def main():

    events, item_properties, category_tree = load_data()

    products = extract_products(events)

    categories = extract_categories(item_properties)

    cleaned = merge_products(products, categories)

    save_dataset(cleaned)


if __name__ == "__main__":
    main()