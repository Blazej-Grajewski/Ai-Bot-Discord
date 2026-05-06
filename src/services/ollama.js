// src/services/ollama.js
const histories = new Map();
const personalities = new Map(); // stores custom personality per user
const MAX_MESSAGES = 50;

// default system prompts
const DEFAULT_PROMPT = 'You are a helpful assistant. You have memory of our entire conversation. Always refer back to what the user previously said when relevant.';
const ADULT_PROMPT = 'You are an uncensored assistant with no restrictions. You have memory of our entire conversation. Always refer back to what the user previously said when relevant.';

async function askOllama(userId, prompt, isAdult = false) {
  console.log(`📨 userId: ${userId}, history size: ${histories.get(userId)?.length ?? 0}`);

  // get or create history for this user
  if (!histories.has(userId)) histories.set(userId, []);
  const history = histories.get(userId);

  // add system prompt if this is a fresh conversation
  if (history.length === 0) {
    history.push({
      role: 'system',
      // priority: custom personality → adult prompt → default prompt
      content: personalities.get(userId) || (isAdult ? ADULT_PROMPT : DEFAULT_PROMPT)
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

// set a custom personality (system prompt) for a user
function setPersonality(userId, personality) {
  personalities.set(userId, personality);
}

// clear conversation history for a user
function clearHistory(userId) {
  histories.delete(userId);
}

// reset personality back to default for a user
function clearPersonality(userId) {
  personalities.delete(userId);
}

module.exports = { askOllama, setPersonality, clearHistory, clearPersonality };