const OpenAI = require('openai');
const dotenv = require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.json());
const client = new OpenAI({
    apiKey: process.env.chatgpt_api, 
});

async function chatGPT(prompt = "Respond with No prompt given") {
    try {
        const gptResponse = await client.chat.completions.create(
            { messages: [{ role: "system", content: "You are a helpful assistant." }, 
                { role: "user", 
                content: prompt }], 
                model: "gpt-4o-mini", 
                max_tokens: 150 });
                return String(gptResponse.choices[0].message.content);
            } catch (e) {
                console.log(e);
                return "Error";
            }
}
app.post("/", (req, res) => {
    chatGPT(String(req.body.body)).then((output) => {
        res.send({ "response": output });
    });
});

const PORT = process.env.PORT || 8080;


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);