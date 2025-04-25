from flask import Flask, request, jsonify
from flask_cors import CORS
from src.predict import load_model, predict_url

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
model_path = './models/model_50000.pt'
model = load_model(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        # Extract URL from request
        url = data.get("url")
        if not url:
            return jsonify({'error': 'Missing URL in request'}), 400

        # Perform prediction
        predicted_label = predict_url(model, url)

        return jsonify({'prediction': predicted_label})
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
