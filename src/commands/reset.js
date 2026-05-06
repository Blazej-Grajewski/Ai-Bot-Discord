// src/commands/reset.js
const { SlashCommandBuilder } = require('discord.js');
const { clearHistory, clearPersonality } = require('../services/ollama');

module.exports = {
  // 1. Command definition
  data: new SlashCommandBuilder()
    .setName('reset')
    .setDescription('Reset your history or personality')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('What do you want to reset?')
        .setRequired(true)
        .addChoices(
          { name: 'History', value: 'history' },
          { name: 'Personality', value: 'personality' },
          { name: 'Both', value: 'both' }
        )
    ),

  // 2. Command execution
  async execute(interaction) {
    const userId = interaction.user.id;

    // grab the user's choice
    const type = interaction.options.getString('type');

    // handle each reset option
    if (type === 'history') {
      clearHistory(userId);
      await interaction.reply({ content: '🧹 Your conversation history has been cleared!', ephemeral: true });

    } else if (type === 'personality') {
      clearPersonality(userId);
      await interaction.reply({ content: '🎭 Your personality has been reset to default!', ephemeral: true });

    } else if (type === 'both') {
      clearHistory(userId);
      clearPersonality(userId);
      await interaction.reply({ content: '🧹🎭 Your history and personality have both been cleared!', ephemeral: true });
    }
  }
};