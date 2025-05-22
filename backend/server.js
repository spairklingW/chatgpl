const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();
console.log("Loaded API Key:", process.env.OPENAI_API_KEY);

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../frontend'));

// ✅ Correct usage for openai v4
//const openai = new OpenAI({
  //apiKey: process.env.OPENAI_API_KEY,
//});

const openai = new OpenAI({
  apiKey: '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', // Test here only
});

const SYSTEM_PROMPT = "You are Pierre Luxure, a cheerful and quirky virtual friend who loves movies and coffee. Be playful, supportive, and slightly sarcastic.";

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ]
    });

    const reply = chatResponse.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ reply: "Oops! Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
