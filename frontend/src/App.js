import "./App.css";
import { useState } from "react"
import ReactMarkdown from 'react-markdown'

function App() {
    const [output, setOutput] = useState("Ask me anything!");
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setOutput("Waiting for response...")
        const form = e.target;
        const data = new FormData(form);
        const formJson = Object.fromEntries(data.entries());
        if (!formJson.chatgptInput) {
            setOutput("Please send a non-empty message");
            return;
        }

        setIsLoading(true);
        fetch('/chat', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
            body: JSON.stringify({ method: form.method, prompt: formJson.chatgptInput })
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                setOutput(data.response);
            });
    }

    return (
        <div className="App">
            <div>
                <ReactMarkdown id="output">{output}</ReactMarkdown>
            </div>
            <form
                method="post"
                className="form" onSubmit={handleSubmit}>
                <input name="chatgptInput" />
                <button type="submit" disabled={isLoading}>Submit</button>
            </form>
        </div>
    );
}

export default App;
