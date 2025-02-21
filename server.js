require('dotenv').config();
const express = require("express");
const OpenAI = require('openai');

const app = express();
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function chat(history) {
    try {
        console.log(history);
        const gptResponse = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a trivia bot." },
                ...history
            ],
            max_tokens: 150
        });

        return gptResponse.choices[0]?.message?.content || "No response from AI";
    } catch (e) {
        console.error("OpenAI API Error:", e);
        return `OpenAI Error: ${e.message || "Unknown error"}`;
    }
}

app.post("/chat", async (req, res) => {
    try {
        const history = req.body.history;
        console.log(history);

        if (!history) {
            return res.status(400).json({ error: "Invalid request body" });
        }

        const output = await chat(history);
        res.json({ response: output });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
});
