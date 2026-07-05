import { MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import r from './path.js'

export const data = new SlashCommandBuilder()
    .setName('application')
    .setDescription('Sends application panel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction) {
    const channel = interaction.channel
    channel.send({components: r.functions.getComponents.applications.main, flags: MessageFlags.IsComponentsV2})
    await interaction.reply({flags: MessageFlags.Ephemeral, content: "Successfully sent applications message at <#" + channel.id + ">"})
}
