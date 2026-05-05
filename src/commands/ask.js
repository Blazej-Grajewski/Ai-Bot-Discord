// src/commands/ask.js
const { SlashCommandBuilder } = require('discord.js');
const { askOllama } = require('../services/ollama');

module.exports = {
  // 1. Command definition — what Discord knows about this command
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask the local AI a question')
    .addStringOption(option =>
      option
        .setName('prompt')
        .setDescription('Your question')
        .setRequired(true)
    ),

  // 2. Command execution — what happens when the user runs /ask
  async execute(interaction) {
    // Tell Discord to wait — Ollama can take a few seconds
    await interaction.deferReply();

    // Grab what the user typed
    const prompt = interaction.options.getString('prompt');

    try {
      // Send the prompt to local Ollama and wait for response
      const result = await askOllama(interaction.user.id, prompt);

      // Guard against empty or non-string responses
      const safe = (typeof result === 'string' && result.trim())
        ? result.trim()
        : 'No response from the model.';

      // Discord has a 2000 character limit — slice just in case
      await interaction.editReply(safe.slice(0, 2000));

    } catch (error) {
      // Something went wrong — log it and let the user know
      console.error('❌ ask command error:', error.message);
      await interaction.editReply('Something went wrong while contacting Ollama. Is it running?');
    }
  }
};