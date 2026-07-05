import { MessageFlags, PermissionFlagsBits } from 'discord.js'
import r from './../path.js'

export async function handle(interaction) {
    if (!r.config.tickets.enableTickets) return await interaction.reply({flags: MessageFlags.Ephemeral, content: "**Tickets have been disabled by the server administrator.** Please try again later or contact the administrator."})
    const [ticketType, action] = interaction.customId.split("::")
    const ticketChannel = interaction.channel

    // Check perms
    const hasPermission = interaction.member.roles.cache.some(role => r.config.tickets.supportRoles.includes(role.id));
    if (!hasPermission) return await interaction.reply({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.tickets.noPermissions})


    switch (action) {
        case "claim":
            await interaction.message.edit({components: r.functions.getComponents.tickets.unclaimButtons})
            await interaction.channel.permissionOverwrites.set([
                {
                    id: interaction.guild.id, 
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel, 
                        PermissionFlagsBits.SendMessages, 
                        PermissionFlagsBits.ReadMessageHistory, 
                        PermissionFlagsBits.AttachFiles
                    ],
                },
                ...r.config.tickets.supportRoles.map(roleId => ({
                    id: roleId,
                    deny: [
                        PermissionFlagsBits.ViewChannel, 
                        PermissionFlagsBits.SendMessages, 
                        PermissionFlagsBits.ManageMessages
                    ],
                }))
            ]);
            await ticketChannel.send({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.tickets.ticketClaimed(interaction.user.id)})
            break;
        case "unclaim":
            await interaction.message.edit({components: r.functions.getComponents.tickets.claimButtons})
            await interaction.channel.permissionOverwrites.set([
                {
                    id: interaction.guild.id, 
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [],
                },
                ...r.config.tickets.supportRoles.map(roleId => ({
                    id: roleId,
                    allow: [
                        PermissionFlagsBits.ViewChannel, 
                        PermissionFlagsBits.SendMessages, 
                        PermissionFlagsBits.ManageMessages
                    ],
                }))
            ]);
            await ticketChannel.send({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.tickets.ticketUnclaimed(interaction.user.id)})
            break;
        case "close":
            const logChannel = interaction.guild.channels.cache.get(r.config.tickets.ticketLogsChannel);

            if (!r.config.tickets.enableTickets) return await interaction.reply({flags: MessageFlags.Ephemeral, content: "**Tickets have been disabled by the server administrator.** Please try again later or contact the administrator."})
            if (r.config.tickets.enableTranscripts) {
                return r.functions.consoleMessages.warn("Transcriptions are not available in this version of ICv2S. Please disable them in the config.")
                /*const transcript = await createTranscript(interaction.channel, {
                    limit: -1, 
                    fileName: `ticket-${interaction.channel.name}.html`,
                    // Optional: Downloads images directly into the HTML so they never expire
                    saveImages: true, 
                    // Powerful feature: Resolves mentions to real names
                    hydrateCanvases: true 
                });

                await logChannel.send({
                    content: `Transcript for ${interaction.channel.name} generated <t:${Math.floor(Date.now() / 1000)}:R>`,
                    files: [transcript],
                });*/
            } else {
                await logChannel.send({
                    content: `Ticket **'${interaction.channel.name}'** has been logged at <t:${Math.floor(Date.now() / 1000)}:R>
Closed by <@${interaction.user.id}>
**Transcripts are disabled.**`,
                });
            }
            
            await interaction.channel.delete();
            break;
        default:
            return await interaction.reply("Undefined button. Please try again later or contact us via tickets.");
    }
}