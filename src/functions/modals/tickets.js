import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";


export function createTicket(ticketType) {
    if (!["general", "hr"].includes(ticketType)) throw new TypeError(`TicketType for createTicket() needs to be either 'general' or 'hr', passed '${ticketType}'`)
    const modal = new ModalBuilder()
        .setCustomId(`ticketCreate::${ticketType}`)
        .setTitle('Create a ticket!');

    const reason = new TextInputBuilder()
        .setCustomId('reason')
        .setLabel("What's the reason for the ticket?")
        .setStyle(TextInputStyle.Paragraph);

    const reasonActionRow = new ActionRowBuilder().addComponents(reason);
    modal.addComponents(reasonActionRow);

    return modal
}

export function createNewsTicket() {
    const modal = new ModalBuilder()
        .setCustomId('ticketCreate::news')
        .setTitle('Create a ticket!');

    const newsDetails = new TextInputBuilder()
        .setCustomId('newsDetails')
        .setLabel("What news do you bring to us?")
        .setStyle(TextInputStyle.Paragraph);
    
    const newsReviewReason = new TextInputBuilder()
        .setCustomId('newsReviewReason')
        .setLabel("Why should we review this news?")
        .setStyle(TextInputStyle.Paragraph);

    const newsDetailsActionRow = new ActionRowBuilder().addComponents(newsDetails);
    const newsReviewReasonActionRow = new ActionRowBuilder().addComponents(newsReviewReason);
    modal.addComponents(newsDetailsActionRow, newsReviewReasonActionRow);

    return modal
}