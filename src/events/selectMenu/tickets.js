import { MessageFlags } from 'discord.js'
import r from './../path.js'

export async function handle(interaction) {
    const value = interaction.values[0]

    let ticketType = "general"
    let isNewsTicket = false
    let rolesMentioned = []

    switch (value) {
        case "general":
            rolesMentioned = r.config.tickets.supportRoles
            break;
        case "news":
            rolesMentioned = r.config.tickets.newsRoles
            ticketType = "news"
            isNewsTicket = true
            break;
        case "hr":
            rolesMentioned = r.config.tickets.hrRoles
            ticketType = "hr"
            break;
        default:
            await interaction.reply({flags: MessageFlags.Ephemeral, content:  "This option doesn't exist. Please try a different one or let us know by creating a ticket!"})
    }

    // Create modal
    if (isNewsTicket) return interaction.showModal(r.functions.getModals.tickets.createNewsTicket())
    return interaction.showModal(r.functions.getModals.tickets.createTicket(ticketType))
}