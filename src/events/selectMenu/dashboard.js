import { MessageFlags } from 'discord.js'
import r from './../path.js'

export async function handle(interaction) {
    const value = interaction.values[0]

    switch (value) {
        case "regulations":
            await interaction.reply({flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2], components: r.functions.getComponents.dashboard.regulations})
            break;
        case "about_server":
            await interaction.reply({flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2], components: r.functions.getComponents.dashboard.about_server})
            break;
        case "settings":
        case "settings2":
            await interaction.deferReply({flags: [MessageFlags.Ephemeral]})
            const [rows] = await r.pool.query("SELECT * FROM users WHERE userId = ?", [interaction.user.id])
            if (rows.length > 0) {
                const user = rows[0]
                await interaction.editReply({flags: [MessageFlags.IsComponentsV2], components: await r.functions.getComponents.dashboard.settings_loggedIn(user.username, user.userUUID, r.accountStats.getAccountAgeMessage(user.created_at))})
            } else {
                await interaction.editReply({flags: [MessageFlags.IsComponentsV2], components: r.functions.getComponents.dashboard.settings_notLoggedIn})
            }
            break;
        default:
            await interaction.reply({flags: MessageFlags.Ephemeral, content:  "This option doesn't exist. Please try a different one or let us know by creating a ticket!"})
    }
}