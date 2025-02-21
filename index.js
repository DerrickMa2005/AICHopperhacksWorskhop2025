const OpenAI = require("openai");
require('dotenv').config();

const client = new OpenAI();

async function main() {
  const completion = await client.chat.completions.create({
    messages: [
        { role: "developer", content: "You are a helpful assistant." } // user, assistant are also roles
    ],
    model: "gpt-4o-mini"
  });

  console.log(completion.choices[0].message.content);
}

main();