const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Make sure this is installed

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for your frontend
app.use(cors({
  origin: 'https://asheintechnologies.vercel.app'
}));

app.use(bodyParser.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://asheintechnologies.vercel.app', // Optional but recommended
        'X-Title': 'Ashein AI Chatbot' // Optional: for tracking usage in your OpenRouter dashboard
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo', // You can also try other models like anthropic/claude-3-haiku
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();

    console.log('🧠 OpenRouter AI response:', data);
    
    if (data.choices && data.choices.length > 0) {
  res.json({ reply: data.choices[0].message.content });
} else {
  console.error('Invalid OpenRouter response:', data);
  res.status(500).json({ reply: 'Sorry, I couldn’t get a response from the AI.' });
    }
});

app.listen(port, () => {
  console.log(`🚀 Ashein AI Chatbot running on port ${port}`);
});
