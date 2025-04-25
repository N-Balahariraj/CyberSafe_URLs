import os
import torch
from transformers import BertTokenizer, BertForSequenceClassification
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the model download link from the .env file
MODEL_URL = os.getenv("model_download_link")

def download_model(model_url, model_path):
    if not os.path.exists(model_path):
        print(f"Downloading model from {model_url}...")
        response = requests.get(model_url, stream=True)
        with open(model_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print("Model downloaded successfully.")

# Load the pre-trained model
def load_model(model_path):
    try:
        # Download the model if it doesn't exist
        download_model(MODEL_URL, model_path)

        # Define the model architecture
        model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=4)
        
        # Load the state dictionary into the model
        state_dict = torch.load(model_path, map_location=torch.device('cpu'))
        model.load_state_dict(state_dict)
        model.eval()  # Ensure the model is in evaluation mode
        return model
    
    except Exception as e:
        print(f"Error loading model: {e}")
        raise

# Load BERT tokenizer
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# Function to preprocess and tokenize a URL
def preprocess_and_tokenize(url):
    # Preprocess the URL
    url = url.lower().strip()
    url = url.replace("https://", "").replace("http://", "").replace("www.", "")
    url = url.replace("/", " ").replace(".", " ").replace("-", " ").replace("_", " ").replace("=", " ")
    
    # Tokenize the URL
    tokens = tokenizer(url, padding="max_length", truncation=True, max_length=32, return_tensors="pt")
    return tokens

# Function to predict the label for a given URL
def predict_url(model, url):
    try:
        # Preprocess and tokenize the URL
        tokens = preprocess_and_tokenize(url)

        # Perform prediction
        with torch.no_grad():
            outputs = model(tokens["input_ids"], attention_mask=tokens["attention_mask"])
            
            # Ensure outputs is a tuple and extract logits
            logits = outputs[0] if isinstance(outputs, tuple) else outputs.logits
            
            # Get the predicted class
            prediction = torch.argmax(logits, dim=1).item()

        # Map prediction to label
        label_mapping = {0: "benign", 1: "phishing", 2: "defacement", 3: "malware"}
        predicted_label = label_mapping.get(prediction, "unknown")

        return predicted_label
    except Exception as e:
        print(f"Error during prediction: {e}")
        raise