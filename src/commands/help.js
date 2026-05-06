// src/commands/help.js
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  // 1. Command definition
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List all available commands'),

  // 2. Command execution
  async execute(interaction) {
    // read all command files from the same directory
    const commandsPath = __dirname;
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    const commands = [];

    for (const file of commandFiles) {
      // skip help.js itself to avoid listing itself
      if (file === 'help.js') continue;

      const command = require(path.join(commandsPath, file));

      // only include valid commands that have data defined
      if (command.data) {
        const name = command.data.name;
        const desc = command.data.description || 'No description';
        commands.push(`**\`/${name}\`** - ${desc}`);
      }
    }

    // ephemeral — only visible to the user who ran /help
    await interaction.reply({
      content: `📜 **Available Commands**\n\n` + commands.join('\n'),
      ephemeral: true
    });
  }
};