# AICHopperhacksWorshop2025

This repo contains the completed project which we covered in the Hopperhacks workshop. This branch contains the functioning code. Note: Once the workshop is over, you will need your own ChatGPT API key to run this project.

## How to run the project

**Step 1**

Install dependencies. We can simply use npm to do so.

```
npm install
```

**Step 2**

Create a .env file to hold your ChatGPT API Key.

```
OPENAI_API_KEY: "<Insert Your API Key Here>"
```

**Step 3**

Run the webserver, this will be where all of the backend is hosted.

```
node server.js
```

**Step 4**

Open up a new terminal to run the frontend.

```
cd frontend
npm start
```

**Step 5**

Close out the program using Ctrl + C on both terminals.