import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";


export function promotionModal(user_id, new_role) {
    const modal = new ModalBuilder()
        .setCustomId(`promotion::${user_id}::${new_role}`)
        .setTitle('Issue a promotion');

    const reason = new TextInputBuilder()
        .setCustomId('reason')
        .setLabel("What's the reason for the promotion?")
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(3);

    const note = new TextInputBuilder()
        .setCustomId('note')
        .setLabel("Any notes?")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

    const reasonActionRow = new ActionRowBuilder().addComponents(reason);
    const noteActionRow = new ActionRowBuilder().addComponents(note);
    modal.addComponents([reasonActionRow, noteActionRow]);

    return modal
}