
// Filename - App.js
import "./App.css";
import { useState } from "react"

function App() {
    const [output, setOutput] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setOutput("Waiting for response...")
        const form = e.target;
        const data = new FormData(form);
        const formJson = Object.fromEntries(data.entries());
        fetch('/', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
            body: JSON.stringify({ method: form.method, body: formJson.chatgptInput })
        })
            .then(response => response.json())
            .then(data => {
                setOutput(data.response);
            });
    }

    return (
        <div className="App">
            <form
                method="post"
                className="form" onSubmit={handleSubmit}>
                <input name="chatgptInput" />
                <button type="submit">Submit</button>
            </form>
            <p id="output">{output}</p>
        </div>
    );
}

export default App;
