import { MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import r from './path.js'

export const data = new SlashCommandBuilder()
    .setName('dashboard')
    .setDescription('Sends dashboard')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction) {
    const channel = interaction.channel
    channel.send({components: r.functions.getComponents.dashboard.main, flags: MessageFlags.IsComponentsV2})
    await interaction.reply({flags: MessageFlags.Ephemeral, content: "Successfully sent dashboard message at <#" + channel.id + ">"})
}
