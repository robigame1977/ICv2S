import { MediaGalleryBuilder, MediaGalleryItemBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder } from 'discord.js';
import config from './../../config.js'

export const main = [
    new ContainerBuilder()
        .addMediaGalleryComponents(
            new MediaGalleryBuilder()
                .addItems(
                    new MediaGalleryItemBuilder()
                        .setURL(config.imageAssets.banner),
                ),
        )
        .addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`# Create a ticket!
Don't know what to choose?
- choose **General Inquiries** if the reason doesn't require higher ranks help,
- choose **Request a News Report!** if you would like to give us your ideas or report a new incident!
- or choose **Higher Ranks needed** if you need a specialist help or want to report things related to the server's stability.
                `),
        )
        .addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("tickets")
                        .setMaxValues(1)
                        .addOptions(
                            { label: "General Inquiries", value: "general" },
                            { label: "Request a News Report!", value: "news" },
                            { label: "Higher Ranks needed", value: "hr" },
                        ),
                ),
        )
        .addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("isopl.pl")
                        .setURL("https://isopl.pl/"),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("icv2.cloud")
                        .setURL("https://icv2.cloud/"),
                ),
        ),
];

export function ticketStartMessage(interaction, ticketType, reason) {
    const ticketTypeMessage = (ticketType === "general") ? "General Inquiries" : "High Ranking member required!";
    const roleHandlingTicketMessage = (ticketType === "general") ? "support agent" : "high rank member";

    return [
        new ContainerBuilder()
            .addMediaGalleryComponents(
                new MediaGalleryBuilder()
                    .addItems(
                        new MediaGalleryItemBuilder()
                            .setURL(config.imageAssets.banner_utility),
                    ),
            )
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# ${ticketTypeMessage}
### ${config.emojiAssets.user} Informations about the ticket
〉Created by <@${interaction.user.id}>
〉Ticket type: **${ticketType}**          

### 〚 Reason 〛
\`\`\`
${reason}
\`\`\`

**Thank you for creating a ticket. A ${roleHandlingTicketMessage} will reach out to you as soon as possible!**
                    `),
            ),
    ];
}

export function ticketNewsStartMessage(interaction, newsDetails, newsReviewReason) {
    return [
        new ContainerBuilder()
            .addMediaGalleryComponents(
                new MediaGalleryBuilder()
                    .addItems(
                        new MediaGalleryItemBuilder()
                            .setURL(config.imageAssets.banner_utility),
                    ),
            )
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# New news request!
### ${config.emojiAssets.user} Informations about the ticket
〉Created by <@${interaction.user.id}> 

### 〚 News Details 〛
\`\`\`
${newsDetails}
\`\`\`
### 〚 Why should we review it? 〛
\`\`\`
${newsReviewReason}
\`\`\`

**Thank you for creating a ticket. A support agent will reach out to you as soon as possible!**
                    `),
            ),
    ];
}

export const noPermissions = [
    new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`〉Insufficient permissions to perform this operation.`),
        )
];

export const claimButtons = [
    new ContainerBuilder()
        .addMediaGalleryComponents(
            new MediaGalleryBuilder()
                .addItems(
                    new MediaGalleryItemBuilder()
                        .setURL(config.imageAssets.ruler),
                ),
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`### Use available buttons below to perform changes to the ticket.`),
        )
        .addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("tickets::claim")
                        .setLabel("Claim")
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId("tickets::close")
                        .setLabel("Close")
                        .setStyle(ButtonStyle.Danger),
                ),
        )
];

export const unclaimButtons = [
    new ContainerBuilder()
        .addMediaGalleryComponents(
            new MediaGalleryBuilder()
                .addItems(
                    new MediaGalleryItemBuilder()
                        .setURL(config.imageAssets.ruler),
                ),
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`### Use available buttons below to perform changes to the ticket.`),
        )
        .addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("tickets::unclaim")
                        .setLabel("Unclaim")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId("tickets::close")
                        .setLabel("Close")
                        .setStyle(ButtonStyle.Danger),
                ),
        )
];

export function ticketClaimed(userid) {
    return [
        new ContainerBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`### 〉Ticket claimed by <@${userid}>`),
            )
    ];
}

export function ticketUnclaimed(userid) {
    return [
        new ContainerBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`### 〉Ticket unclaimed by <@${userid}>`),
            )
    ];
}

export function ticketClosed(userid, reason) {
    return [
        new ContainerBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`### 〉Ticket closed by <@${userid}>
〚 Reason 〛
\`\`\`${reason}\`\`\`
                    `),
            )
    ];
}