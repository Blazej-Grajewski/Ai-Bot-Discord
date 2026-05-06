// src/commands/setpersonality.js
const { SlashCommandBuilder } = require('discord.js');
const { setPersonality, clearHistory } = require('../services/ollama');

module.exports = {
  // 1. Command definition
  data: new SlashCommandBuilder()
    .setName('setpersonality')
    .setDescription('Set a custom personality for the AI')
    .addStringOption(option =>
      option
        .setName('personality')
        .setDescription('Describe how the AI should behave')
        .setRequired(true)
    ),

  // 2. Command execution
  async execute(interaction) {
    const userId = interaction.user.id;

    // get the personality string
    const personality = interaction.options.getString('personality');

    // save the custom personality for this user
    setPersonality(userId, personality);

    // clear history so new personality kicks in immediately
    clearHistory(userId);

    // confirm to the user — ephemeral so only they see it
    await interaction.reply({
      content: `🎭 Personality set!\n\n> ${personality}`,
      ephemeral: true
    });
  }
};