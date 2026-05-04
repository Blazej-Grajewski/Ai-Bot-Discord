// src/services/ollama.js

async function askOllama(prompt) {
const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        model: process.env.OLLAMA_MODEL ?? 'llama3.2',
        prompt,
        stream: false
    })
});  

    const data = await res.json();
    return data.response; // Ollama puts the text here
}

module.exports = { askOllama };
