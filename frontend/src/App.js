import "./App.css";
import { useState } from "react"
import ReactMarkdown from 'react-markdown'

function App() {
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const formJson = Object.fromEntries(data.entries());
        if (!formJson.chatgptInput) {
            return;
        }

        setIsLoading(true);
        fetch('/chat', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
            body: JSON.stringify({ message: formJson.chatgptInput })
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                setResponse(data.response);
            })
            .catch(e => {
                setIsLoading(false);
                setResponse(e.message);
            })
    }

    return (
        <div className="App">
            <div>{response}</div>
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
