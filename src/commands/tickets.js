import { MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import r from './path.js'

export const data = new SlashCommandBuilder()
    .setName('tickets')
    .setDescription('Sends a ticket panel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction) {
    const channel = interaction.channel
    channel.send({components: r.functions.getComponents.tickets.main, flags: MessageFlags.IsComponentsV2})
    await interaction.reply({flags: MessageFlags.Ephemeral, content: "Successfully sent tickets panel at <#" + channel.id + ">"})
}
