import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the ping of the bot.');

export async function execute(interaction) {
    const api_ping = interaction.client.ws.ping
    await interaction.reply(`🥬 Ping: ${api_ping}ms`);
}
