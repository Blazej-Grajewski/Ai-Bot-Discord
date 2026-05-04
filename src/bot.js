// src/bot.js
require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { loadCommands } = require('./handlers/commandHandler');

// 1. Create the client
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// 2. Load commands into a Collection
client.commands = new Collection();
loadCommands(client);

// 3. Listen for interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply('Something went wrong.');
  }
});

// 4. Bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// 5. Log in
client.login(process.env.DISCORD_TOKEN);