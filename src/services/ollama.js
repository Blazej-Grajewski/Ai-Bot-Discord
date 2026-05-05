// src/services/ollama.js
const histories = new Map();
const MAX_MESSAGES = 50;

async function askOllama(userId, prompt) {
  console.log(`📨 userId: ${userId}, history size: ${histories.get(userId)?.length ?? 0}`);

  // get or create history for this user
  if (!histories.has(userId)) histories.set(userId, []);
  const history = histories.get(userId);

  // add system prompt if this is a fresh conversation
  if (history.length === 0) {
    history.push({
      role: 'system',
      content: 'You are a helpful assistant. You have memory of our entire conversation. Always refer back to what the user previously said when relevant.'
    });
  }

  // add user message
  history.push({ role: 'user', content: prompt });

  // send full history to Ollama
  const res = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OLLAMA_MODEL ?? 'llama3.2',
      messages: history,
      stream: false
    })
  });

  const data = await res.json();
  const reply = data.message.content;

  // add assistant response
  history.push({ role: 'assistant', content: reply });

  console.log(`📝 history size after: ${history.length}`);

  // trim to last 50 messages
  if (history.length > MAX_MESSAGES) {
    history.splice(0, history.length - MAX_MESSAGES);
  }

  return reply;
}

function clearHistory(userId) {
  histories.delete(userId);
}

module.exports = { askOllama, clearHistory };