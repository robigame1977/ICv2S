import { MessageFlags } from 'discord.js'
import r from './../path.js'

export async function handle(interaction) {
    const value = interaction.values[0]
    if (value.length > 60) {
        r.functions.consoleMessages.error(`ApplicationType field has a hard limit of 60 characters; applicationType '${value}' hits the limit.`)
        return await interaction.reply({flags: MessageFlags.Ephemeral, content: "Application type exceeds length of varchar limit. This error has been logged."})
    }

    interaction.user.send({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.applications.mainDMs(value)})

    await interaction.reply({flags: MessageFlags.Ephemeral, content: "A message has been sent to your DMs."})


}