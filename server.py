from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai

load_dotenv()

app = Flask(__name__)   # ✅ This line is mandatory
CORS(app)               # ✅ Optional but useful for frontend requests

openai.api_key = os.getenv("OPENAI_API_KEY")

# Define the bot's personality
SYSTEM_PROMPT = "You are Ashein AI Assistant, a helpful and friendly bot."

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"reply": "Please enter a message."})

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ]
        )
        reply = response.choices[0].message.content
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(port=5000)
