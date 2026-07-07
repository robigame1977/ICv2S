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
            const user = await r.functions.icv2.getUser.byUserID(interaction.user.id)
            console.log(user)
            if (!user.username)  {
                return await interaction.editReply({flags: [MessageFlags.IsComponentsV2], components: r.functions.getComponents.dashboard.settings_notLoggedIn})
            }
            await interaction.editReply({flags: [MessageFlags.IsComponentsV2], components: await r.functions.getComponents.dashboard.settings_loggedIn(user.username, user.userUUID, r.functions.accountStats.getAccountAgeMessage(user.created_at))})
            break;
        default:
            await interaction.reply({flags: MessageFlags.Ephemeral, content:  "This option doesn't exist. Please try a different one or let us know by creating a ticket!"})
    }
}