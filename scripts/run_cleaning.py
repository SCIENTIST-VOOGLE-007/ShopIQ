import os
import subprocess


PIPELINE_DIR = "ai-engine/pipeline"


def run_script(script_name):

    script_path = os.path.join(PIPELINE_DIR, script_name)

    print("\n====================================")
    print(f"Running {script_name}")
    print("====================================")

    result = subprocess.run(["python", script_path])

    if result.returncode != 0:
        print(f"Error while running {script_name}")
        exit(1)

    print(f"{script_name} completed successfully")


def main():

    scripts = [
        "amazon_cleaning.py",
        "olist_cleaning.py",
        "instacart_cleaning.py",
        "retailrocket_cleaning.py",
        "dataset_normalizer.py",
        "dataset_merger.py"
    ]

    for script in scripts:
        run_script(script)

    print("\n====================================")
    print("ALL DATA CLEANING COMPLETED")
    print("Merged dataset created successfully")
    print("====================================")


if __name__ == "__main__":
    main()