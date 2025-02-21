require('dotenv').config();
const express = require("express");
const OpenAI = require('openai');

const app = express();
app.use(express.json());

// TODO: create OpenAI API client

async function chat(message) {
    return `Response to ${message}`;
}

app.post("/chat", async (req, res) => {
    const message = req.body.message;
    if (!message) {
        res.status(500).json("Error: No message")
    }
    const output = await chat(message);
    res.json({ response: output });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
});
