// src/commands/ask.js
const { SlashCommandBuilder } = require('discord.js');
const { askOllama } = require('../services/ollama');
const { isRateLimited } = require('../handlers/rateLimiter');
const { hasRole } = require('../handlers/roleChecker');

module.exports = {
  // 1. Command definition
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask the local AI a question')
    .addStringOption(option =>
      option
        .setName('prompt')
        .setDescription('Your question')
        .setRequired(true)
    ),

  // 2. Command execution
  async execute(interaction) {
    // tell Discord to wait — Ollama can take a few seconds
    await interaction.deferReply();

    const userId = interaction.user.id;

    // check rate limit before doing anything else
    const timeLeft = isRateLimited(userId);
    if (timeLeft) {
      return interaction.editReply(`⏳ Slow down! Try again in ${timeLeft} seconds.`);
    }

    // check if user has 18+ role for uncensored mode
    const isAdult = hasRole(interaction, '18+');

    // grab what the user typed
    const prompt = interaction.options.getString('prompt');

    try {
      // send to Ollama with user ID, prompt and adult flag
      const result = await askOllama(userId, prompt, isAdult);

      // guard against empty responses
      const safe = (typeof result === 'string' && result.trim())
        ? result.trim()
        : 'No response from the model.';

      // Discord has a 2000 character limit
      await interaction.editReply(safe.slice(0, 2000));

    } catch (error) {
      console.error('❌ ask command error:', error.message);
      await interaction.editReply('Something went wrong while contacting Ollama. Is it running?');
    }
  }
};