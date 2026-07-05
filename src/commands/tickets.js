import { MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import r from './path.js'

export const data = new SlashCommandBuilder()
    .setName('tickets')
    .setDescription('Sends a ticket panel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction) {
    if (!r.config.tickets.enableTickets) return await interaction.reply({flags: MessageFlags.Ephemeral, content: "**Tickets have been disabled by the server administrator.** Please try again later or contact the administrator."})
    const channel = interaction.channel
    channel.send({components: r.functions.getComponents.tickets.main, flags: MessageFlags.IsComponentsV2})
    await interaction.reply({flags: MessageFlags.Ephemeral, content: "Successfully sent tickets panel at <#" + channel.id + ">"})
}
