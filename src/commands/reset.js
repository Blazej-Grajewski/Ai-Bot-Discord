// src/commands/reset.js
const { SlashCommandBuilder } = require('discord.js');
const { clearHistory } = require('../services/ollama');

module.exports = {
  // 1. Command definition
  data: new SlashCommandBuilder()
    .setName('reset')
    .setDescription('Clear your conversation history with the AI'),

  // 2. Command execution
  async execute(interaction) {
    // clear this user's history using their Discord ID
    clearHistory(interaction.user.id);
    await interaction.reply('🧹 Your conversation history has been cleared!');
  }
};