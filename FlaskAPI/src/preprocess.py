import re
import pandas as pd
from transformers import BertTokenizer

# Load BERT tokenizer
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# Function to clean and tokenize URLs
def preprocess_url(url):
    url = re.sub(r"https?://(www\.)?", "", url)  # Remove protocol and www
    url = re.sub(r"[\./\-_=]", " ", url)  # Replace special characters
    return url.lower().strip()

def tokenize_urls(urls, max_length=32):
    processed_urls = [preprocess_url(url) for url in urls]
    tokens = tokenizer(processed_urls, padding="max_length", truncation=True, max_length=max_length, return_tensors="pt")
    return tokens

# Function to load and preprocess dataset
def load_and_preprocess_data(file_path):
    df = pd.read_csv(file_path)

    # Check if required columns exist
    if "url" not in df.columns or "type" not in df.columns:
        raise ValueError(f"CSV file must contain 'url' and 'type' columns. Found: {df.columns.tolist()}")

    # Map 'type' column to numerical labels
    label_mapping = {
        "benign": 0,
        "phishing": 1,
        "defacement": 2,
        "malware": 3
    }
    df["label"] = df["type"].map(label_mapping)

    # Drop rows with missing labels
    df = df.dropna(subset=["label"])

    # Extract URLs and labels
    urls = df["url"].astype(str).tolist()
    labels = df["label"].astype(int).tolist()

    # Tokenize URLs
    tokens = tokenize_urls(urls)

    return tokens, labels