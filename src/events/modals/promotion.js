import { ChannelType, MessageFlags, PermissionFlagsBits, PermissionOverwrites } from 'discord.js'
import r from './../path.js'

export async function handle(interaction) {
    const [action, moderatedId, newRole] = interaction.customId.split("::");
    const reason = interaction.fields.getTextInputValue('reason');
    let note = interaction.fields.getTextInputValue('note');

    await interaction.deferReply({flags: MessageFlags.Ephemeral})

    if (!moderatedId) return await interaction.editReply('`User` value has not been passed. Please try again or contact the administrator of the bot.');
    if (!newRole) return await interaction.editReply('`New role` value has not been passed. Please try again or contact the administrator of the bot.');
    if (!reason) return await interaction.editReply('`Reason` value has not been passed. Please try again or contact the administrator of the bot.');
    if (!note) note = "-";

    
    await interaction.channel.send({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.promotion.message(interaction.user.id, moderatedId, newRole, reason, note)})
    
    // Add the role
    const member = await interaction.guild.members.fetch(moderatedId).catch(() => null);
    const cleanRoleId = newRole.replace(/[<@&>]/g, '');
    await member.roles.add(cleanRoleId);

    await interaction.editReply({content: "Promotion sent successfully."})
}