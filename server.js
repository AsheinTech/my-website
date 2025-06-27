const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: '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' // 🔐 Replace with your API key
}));

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // or 'gpt-4' if your key has access
      messages: [{ role: 'user', content: message }]
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`))
