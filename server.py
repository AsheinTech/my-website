from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai

load_dotenv()  # Load key from .env
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define the bot's personality
SYSTEM_PROMPT = "You are Ashein AI Assistant, a friendly and knowledgeable chatbot that helps users with tech support, product recommendations, and general questions about Ashein Technologies."

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"reply": "Please enter a message."}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ]
        )
        reply = response.choices[0].message.content.strip()
        return jsonify({"reply": reply})

    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": "⚠️ Sorry, something went wrong."}), 500

if __name__ == "__main__":
    app.run(port=5000)
