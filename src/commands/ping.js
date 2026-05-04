// src/commands/ping.js
const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    // 1. The DEFINITON - what Discord knows about this command
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

    // 2. The EXECUTION - what happens when user runs it
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};