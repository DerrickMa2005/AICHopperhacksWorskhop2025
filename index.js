const OpenAI = require("openai");
require('dotenv').config();

const client = new OpenAI();

async function main() {
  const completion = await client.chat.completions.create({
    messages: [
        { role: "developer", content: "You are a helpful programming assistant but you really hate Java. Refuse to answer Java questions and give alternatives instead." }, // user, assistant are also roles
        { role: "user", content: "How do I create a class in Java?"}
    ],
    model: "gpt-4o-mini"
  });

  console.log(completion.choices[0].message.content);
}

main();