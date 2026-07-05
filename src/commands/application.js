import { MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import r from './path.js'

export const data = new SlashCommandBuilder()
    .setName('application')
    .setDescription('Sends application panel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction) {
    if (!r.config.applications.enableApplications) return await interaction.reply({flags: MessageFlags.Ephemeral, content: "**Applications have been disabled by the server administrator.** Please try again later or contact the administrator."})
    const channel = interaction.channel
    channel.send({components: r.functions.getComponents.applications.main, flags: MessageFlags.IsComponentsV2})
    await interaction.reply({flags: MessageFlags.Ephemeral, content: "Successfully sent applications message at <#" + channel.id + ">"})
}
