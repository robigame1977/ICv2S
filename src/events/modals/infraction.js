import { ChannelType, MessageFlags, PermissionFlagsBits, PermissionOverwrites } from 'discord.js'
import r from './../path.js'

export async function handle(interaction) {
    const [action, moderatedId, punishmentType] = interaction.customId.split("::");
    const reason = interaction.fields.getTextInputValue('reason');
    let note = interaction.fields.getTextInputValue('note');

    await interaction.deferReply({flags: MessageFlags.Ephemeral})

    if (!moderatedId) return await interaction.editReply('`User` value has not been passed. Please try again or contact the administrator of the bot.');
    if (!reason) return await interaction.editReply('`Reason` value has not been passed. Please try again or contact the administrator of the bot.');
    if (!note) note = "-";

    if (!["warning", "strike", "demotion", "termination", "staff blacklist"].includes(punishmentType.toLowerCase())) return await interaction.editReply({content: `Option ${punishmentType} is invalid. Please choose from the suggested ones instead.`})

    await interaction.channel.send({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.infraction.message(interaction.user.id, moderatedId, punishmentType.toLowerCase(), reason, note)})
    await interaction.editReply({content: "Infraction sent successfully."})
}