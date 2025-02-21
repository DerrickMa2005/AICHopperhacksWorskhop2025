import "./App.css";
import { useState } from "react"
import ReactMarkdown from 'react-markdown'

function App() {
    const [messages, setMessages] = useState([]);
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
        const newMessages = [...messages, { role: "user", content: formJson.chatgptInput }]
        setMessages(newMessages);
        console.log(newMessages);

        fetch('/chat', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
            body: JSON.stringify({ messages: newMessages })
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                setMessages([...newMessages, { role: "assistant", content: data.response }]);
            })
            .catch(e => {
                setIsLoading(false);
                setMessages([...newMessages, { role: "assistant", content: e.message }]);
            })
    }

    return (
        <div className="App">
            <div>
                {messages.map(({ role, content }) => {
                    if (role === "user")
                        return <div className="user">{content}</div>
                    else
                        return <ReactMarkdown>{content}</ReactMarkdown>
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
