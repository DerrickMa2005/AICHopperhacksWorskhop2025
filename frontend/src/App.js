import "./App.css";
import { useState } from "react"
import ReactMarkdown from 'react-markdown'

function App() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        // setOutput("Waiting for response...")
        const form = e.target;
        const data = new FormData(form);
        const formJson = Object.fromEntries(data.entries());
        if (!formJson.chatgptInput) {
            return;
        }

        setIsLoading(true);
        const newHistory  = [...history, {role: "user", content: formJson.chatgptInput}];
        e.target.reset()
        console.log(newHistory);
        setHistory(newHistory)
        fetch('/chat', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
            body: JSON.stringify({ method: form.method, history: newHistory })
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                setHistory(history => [...history, {role: "assistant", content: data.response}]);
            });
    }

    return (
        <div className="App">
            <div>
                {history.map(({role, content}) => {
                    return role === "user" ? <div className="user">{content}</div> : <ReactMarkdown id="output">{content}</ReactMarkdown>
                })}
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
