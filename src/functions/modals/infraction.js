import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";


export function infractionModal(moderated_id, punishment_type) {
    const modal = new ModalBuilder()
        .setCustomId(`infraction::${moderated_id}::${punishment_type}`)
        .setTitle('Issue an infraction');

    const reason = new TextInputBuilder()
        .setCustomId('reason')
        .setLabel("What's the reason for the infraction?")
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(3);

    const note = new TextInputBuilder()
        .setCustomId('note')
        .setLabel("Any notes? (can be empty, used for demoting+)")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

    const reasonActionRow = new ActionRowBuilder().addComponents(reason);
    const noteActionRow = new ActionRowBuilder().addComponents(note);
    modal.addComponents([reasonActionRow, noteActionRow]);

    return modal
}