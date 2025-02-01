
// Filename - App.js
import "./App.css";

function App() {
    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const formJson = Object.fromEntries(data.entries());
        fetch('/', { method: 'POST', 
            headers: {'Accept': 'application/json','Content-Type': 'application/json',}, 
            body: JSON.stringify({method: form.method, body: formJson.chatgptInput})})
            .then(response => response.json())
            .then(data => {
                document.getElementById("output").innerHTML = data.response;
            });
        }
    return (
        <div className="App">
            <header className="App-header">
                <form
                    method="post"
                    className="form" onSubmit={handleSubmit}>
                    <input name="chatgptInput"/>
                    <button type="submit">Submit</button>
                </form>
                <p id="output">Please submit a prompt</p>
            </header>
        </div>
    );
}

export default App;
