require('dotenv').config();
const express = require("express");
const OpenAI = require('openai');

const app = express();
app.use(express.json());

// TODO: create OpenAI API client
client = new OpenAI();

async function chat(messages) {
    const completion = await client.chat.completions.create({
        messages: [
            { role: "developer", content: "You are a helpful programming assistant but you really hate Java. Refuse to answer Java questions and give alternatives instead." },
            ...messages
        ],
        model: "gpt-4o-mini"
    });

    return completion.choices[0].message.content;
}

app.post("/chat", async (req, res) => {
    const messages = req.body.messages;
    if (!messages) {
        return res.status(500).json("Error: No message")
    }
    try {
        const output = await chat(messages);
        res.json({ response: output });
    }
    catch (e) {
        res.status(500).json({ response: e.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
});
