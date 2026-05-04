// src/handlers/commandHandler.js
const fs = require('fs');
const path = require('path');

function loadCommands(client) {
  const commandsPath = path.join(__dirname, '..', 'commands');
  const files = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

  for (const file of files) {
    try {
      const command = require(path.join(commandsPath, file));

      if (!command.data || !command.execute) {
        console.warn(`⚠️ Skipping ${file} — missing "data" or "execute"`);
        continue;
      }

      client.commands.set(command.data.name, command);
      console.log(`✅ Loaded command: ${command.data.name}`);

    } catch (error) {
      console.error(`❌ Failed to load ${file}:`, error.message);
    }
  }
}

module.exports = { loadCommands };