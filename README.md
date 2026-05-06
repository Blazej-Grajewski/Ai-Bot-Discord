# 🤖 AI Bot Discord

A self-hosted Discord bot that integrates with [Ollama](https://ollama.com) to run a local LLM (Llama 3.2) directly on your machine. No external AI APIs, no cloud dependencies — everything stays local.

---

## Features

- **Slash command support** via Discord.js v14
- **Local LLM responses** powered by Ollama (Llama 3.2)
- **Per-user conversation history** — each user has their own separate chat context
- **Memory capped at 50 messages** per user to prevent memory bloat
- **Custom personality system** — users can set their own AI personality
- **18+ uncensored mode** — unlocked automatically for users with the `18+` role
- **Rate limiting** — 10 second cooldown per user to prevent spam
- **No external AI services** — fully offline-capable once set up
- **Modular command handler** — drop new commands into `/commands` and they load automatically
- **Clean service layer** — Ollama logic is decoupled from Discord logic

---

## Project Structure

```
.
├── scripts/
│   └── deploy-commands.js        # Registers slash commands with Discord
└── src/
    ├── bot.js                     # Entry point — creates the client, loads commands, listens for events
    ├── commands/
    │   ├── ping.js                # /ping — health check command
    │   ├── ask.js                 # /ask — sends a prompt to Ollama and replies
    │   ├── reset.js               # /reset — clears history, personality, or both
    │   ├── setpersonality.js      # /setpersonality — sets a custom AI personality
    │   └── help.js                # /help — lists all available commands
    ├── handlers/
    │   ├── commandHandler.js      # Dynamically loads all commands from /commands
    │   ├── rateLimiter.js         # Prevents users from spamming the bot
    │   └── roleChecker.js         # Checks if a user has a specific Discord role
    └── services/
        └── ollama.js              # Handles communication with the local Ollama API
```

---

## Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- [Ollama](https://ollama.com) installed and running locally
- Llama 3.2 model pulled: `ollama pull llama3.2`
- A Discord application with a bot token — [Discord Developer Portal](https://discord.com/developers/applications)

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Blazej-Grajewski/Ai-Bot-Discord.git
cd Ai-Bot-Discord
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_application_id_here
GUILD_ID=your_server_id_here
OLLAMA_MODEL=llama3.2
```

| Variable | Description |
|---|---|
| `DISCORD_TOKEN` | Your bot's token from the Discord Developer Portal |
| `CLIENT_ID` | Your application's client ID |
| `GUILD_ID` | The ID of the Discord server to deploy commands to |
| `OLLAMA_MODEL` | The Ollama model to use (default: `llama3.2`) |

> ⚠️ Never commit your `.env` file — it's already in `.gitignore`

### 4. Make sure Ollama is running

```bash
ollama serve
```

### 5. Deploy slash commands

```bash
npm run deploy
```

### 6. Start the bot

```bash
npm start
```

---

## Commands

| Command | Description |
|---|---|
| `/ask <prompt>` | Sends your prompt to Ollama and returns the model's response |
| `/setpersonality <personality>` | Sets a custom personality for the AI (clears history automatically) |
| `/reset <type>` | Resets your `history`, `personality`, or `both` |
| `/help` | Lists all available commands (only visible to you) |
| `/ping` | Checks if the bot is alive |

---

## How conversation history works

Each Discord user gets their own separate conversation history stored in memory. The bot remembers up to 50 messages per user so the AI can refer back to earlier parts of your conversation. History resets either manually with `/reset` or automatically when the bot restarts.

---

## How personality works

Use `/setpersonality` to change how the AI behaves for you personally. For example:
- `You are a pirate who only speaks in pirate slang`
- `You are a sarcastic assistant who answers everything with a joke`
- `You are a senior software engineer who gives very technical answers`

Your custom personality persists until you reset it with `/reset type: personality`.

---

## 18+ Mode

Users with the `18+` role assigned by a server admin automatically get an uncensored version of the AI. No commands needed — it's based purely on the Discord role.

---

## Contributing

This is a personal learning project, but feel free to fork it and make it your own.

---

## License

MIT
