# 🤖 discord-ollama-bot

A self-hosted Discord bot that integrates with [Ollama](https://ollama.com) to run a local LLM (Llama 3.2) directly on your machine. No external AI APIs, no cloud dependencies — everything stays local.

---

## Features

- **Slash command support** via Discord.js v14
- **Local LLM responses** powered by Ollama (Llama 3.2)
- **No external AI services** — fully offline-capable once set up
- **Modular command handler** — drop new commands into `/commands` and they load automatically
- **Clean service layer** — Ollama logic is decoupled from Discord logic

---

## Project Structure

```
.
├── scripts/
│   └── deploy-commands.js   # Registers slash commands with Discord
└── src/
    ├── bot.js               # Entry point — creates the client, loads commands, listens for events
    ├── commands/
    │   ├── ping.js          # /ping — health check command
    │   └── ask.js           # /ask — sends a prompt to Ollama and replies
    ├── handlers/
    │   └── commandHandler.js  # Dynamically loads all commands from /commands
    └── services/
        └── ollama.js        # Handles communication with the local Ollama API
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
https://github.com/Blazej-Grajewski/Ai-Bot-Discord.git
cd discord-ollama-bot
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

### 4. Make sure Ollama is running

```bash
ollama serve
```

### 5. Deploy slash commands

```bash
node scripts/deploy-commands.js
```

### 6. Start the bot

```bash
node src/bot.js
```

---

## Usage

| Command | Description |
|---|---|
| `/ping` | Checks if the bot is alive — responds with `Pong!` |
| `/ask <prompt>` | Sends your prompt to Ollama and returns the model's response |

---

## Contributing

This is a personal learning project, but feel free to fork it and make it your own.

---

## License

MIT
