import { MediaGalleryBuilder, MediaGalleryItemBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder } from 'discord.js';
import config from './../../config.js'

export const main = [
    new ContainerBuilder()
        .addMediaGalleryComponents(
            new MediaGalleryBuilder()
                .addItems(
                    new MediaGalleryItemBuilder()
                        .setURL(config.imageAssets.banner_applications),
                ),
        )
        .addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`# Applications
Do you want to join us? **It's your lucky day!**
Select from the options below to fit your needs well.

〉**Support Agent:** Help others in need on designated ticket channels,
〉**Internal Affairs:** Manage the internal affairs regarding the server,
〉**News Department:** Contribute into creating awesome news as news anchor or some kind of technician!
〉**News Department Management:** Step up on a higher rank instead if you believe that is what you want.
`),
        )
        .addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("applications")
                        .setMaxValues(1)
                        .addOptions(
                            { label: "Support Agent", value: "support_agent" },
                            { label: "Internal Affairs", value: "internal_affairs" },
                            { label: "News Department", value: "news_department" },
                            { label: "News Department Management", value: "news_department_management" },
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

export function mainDMs(applicationType_raw) {
    const applicationType = applicationType_raw.replaceAll("_", " ");
    return [
    new ContainerBuilder()
        .addMediaGalleryComponents(
            new MediaGalleryBuilder()
                .addItems(
                    new MediaGalleryItemBuilder()
                        .setURL(config.imageAssets.banner_applications),
                ),
        )
        .addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`# Applications
By starting this application, you agree to follow ICv2 terms of service. Failure to do will result in account permanent ban.
All informations that you will provide during this conversation, will be displayed for other staff members - that's why we encourage you to **not send sensitive informations.**
If you, by accident, had provided any sensitive information - cancel the application immediately. We do not store unfinished applications.

### You have selected ${applicationType} application.
To continue, make your choice whether you go in or stay where you were.
If you decide to go in, we wish you luck in joining our team!
`),
        )
        .addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Primary)
                        .setLabel("Begin the application")
                        .setCustomId("applications::begin::" + applicationType),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Danger)
                        .setLabel("Cancel the application")
                        .setCustomId("applications::cancel::intro"),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("icv2.cloud")
                        .setURL("https://icv2.cloud/"),
                ),
        ),
    ]; 
}

export function mainDMs_withoutButtons(applicationType_raw) {
    const applicationType = applicationType_raw.replaceAll("_", " ");
    return [
    new ContainerBuilder()
        .addMediaGalleryComponents(
            new MediaGalleryBuilder()
                .addItems(
                    new MediaGalleryItemBuilder()
                        .setURL(config.imageAssets.banner_applications),
                ),
        )
        .addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`# Applications
By starting this application, you agree to follow ICv2 terms of service. Failure to do will result in account permanent ban.
All informations that you will provide during this conversation, will be displayed for other staff members - that's why we encourage you to **not send sensitive informations.**
If you, by accident, had provided any sensitive information - cancel the application immediately. We do not store unfinished applications.

### You have selected ${applicationType} application.
To continue, make your choice whether you go in or stay where you were.
If you decide to go in, we wish you luck in joining our team!
`),
        )
        .addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("icv2.cloud")
                        .setURL("https://icv2.cloud/"),
                ),
        ),
    ]; 
}

export function questionMessage(qIndex, question, appUUID) {
    return [
    new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`### #${qIndex}: ${question}`),
        )
        .addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Danger)
                        .setLabel("Cancel the application")
                        .setCustomId("applications::cancel::" + appUUID),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("icv2.cloud")
                        .setURL("https://icv2.cloud/"),
                ),
        ),
    ]; 
}

export function finished(appUUID) { 
    return [
    new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`# Application
Thank you for finishing the application! Staff members of the server you applied for will reach out to you shortly, or post the results publicly on the server.
We wish you good luck in passing this!

**Notice:** If you had did this application by accident, provided sensitive informations or changed your mind,
you can still request **deletion** of the application before it gets accepted/denied.
To do that, please click the red button called "Delete Application" and follow further instructions.`),
        )
        .addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel("Application Sent")
                        .setCustomId("disabled")
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Danger)
                        .setLabel("Delete Application")
                        .setCustomId("applications::cancel::" + appUUID),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("icv2.cloud")
                        .setURL("https://icv2.cloud/"),
                ),
        ),
    ];
} 