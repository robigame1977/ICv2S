import { ChannelType, MessageFlags, PermissionFlagsBits, PermissionOverwrites } from 'discord.js'
import r from './../path.js'

export async function handle(interaction) {
    if (!r.config.tickets.enableTickets) return await interaction.reply({flags: MessageFlags.Ephemeral, content: "**Tickets have been disabled by the server administrator.** Please try again later or contact the administrator."})
    const ticketType = interaction.customId.split("::")[1]
    const isNews = (ticketType === "news") ? true : false;
    if (isNews) {
        const newsDetails = interaction.fields.getTextInputValue('newsDetails');
        const newsReviewReason = interaction.fields.getTextInputValue('newsReviewReason');
        const perms = r.config.tickets.newsRoles;
        await interaction.deferReply({flags: MessageFlags.Ephemeral})

        // Create a new channel
        const ticketChannel = await interaction.guild.channels.create({
            name: `news-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: r.config.tickets.ticketsCategory,
            PermissionOverwrites: [{
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
            {
                ...perms.map(roleId => ({
                    id: roleId,
                    allow: [
                        PermissionFlagsBits.ViewChannel, 
                        PermissionFlagsBits.SendMessages, 
                        PermissionFlagsBits.ManageMessages
                    ],
                }))
            }],
        });

        const roleMentions = perms.map(roleId => `<@&${roleId}>`).join(', ');
        ticketChannel.send({content: `${roleMentions}`})
        ticketChannel.send({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.tickets.ticketNewsStartMessage(interaction, newsDetails, newsReviewReason)})
        const actionMessage = ticketChannel.send({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.tickets.claimButtons});

        ticketChannel.setTopic(actionMessage.id)
        
        await interaction.editReply({content: `Created a new ticket: <#${ticketChannel.id}>`})
    } else {
        const reason = interaction.fields.getTextInputValue('reason');
        const perms = (ticketType === "general") ? r.config.tickets.supportRoles : r.config.tickets.hrRoles;

        await interaction.deferReply({flags: MessageFlags.Ephemeral})

        // Create a new channel
        const ticketChannel = await interaction.guild.channels.create({
            name: `${ticketType}-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: r.config.tickets.ticketsCategory,
            PermissionOverwrites: [{
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
            {
                ...perms.map(roleId => ({
                    id: roleId,
                    allow: [
                        PermissionFlagsBits.ViewChannel, 
                        PermissionFlagsBits.SendMessages, 
                        PermissionFlagsBits.ManageMessages
                    ],
                }))
            }],
        });

        const roleMentions = perms.map(roleId => `<@&${roleId}>`).join(', ');
        ticketChannel.send({content: `${roleMentions}`})
        ticketChannel.send({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.tickets.ticketStartMessage(interaction, ticketType, reason)})
        const actionMessage = ticketChannel.send({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.tickets.claimButtons});

        ticketChannel.setTopic(actionMessage.id)
        
        await interaction.editReply({content: `Created a new ticket: <#${ticketChannel.id}>`})
    }
    
    
}