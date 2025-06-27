const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 5000;

// Allow frontend to connect
app.use(cors({
  origin: 'https://asheintechnologies.vercel.app'
}));
app.use(bodyParser.json());

// Correct SDK setup (v4+)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY  // ✅ Securely loaded from Render
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    });

    console.log("🧠 GPT Response:", response); // ✅ Add this

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ ERROR:", error); // ✅ Add this
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`))
