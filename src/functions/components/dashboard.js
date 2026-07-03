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
            new TextDisplayBuilder().setContent(`Welcome to the ICv2S dashboard. Please choose from the options below to continue:`),
        )
        .addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("dashboard")
                        .setMaxValues(1)
                        .addOptions(
                            { label: "Regulations", value: "regulations", emoji: { id: "1521049102899482725" } },
                            { label: "About Server", value: "about_server", emoji: { id: "1413796574340976641" } },
                            { label: "Settings", value: "settings", emoji: {id: "1413796565428076555"} },
                            { label: "Cooler Settings", value: "settings2", emoji: {id: "1413796565428076555"} },
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

export const regulations = [
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
            new TextDisplayBuilder().setContent(
`# ${config.emojiAssets.book} Regulations
Below is the list of the rules that you must follow when you are using one of our services, including this discord server.
\`\`\`ini
[Rules regarding interactions with other members/customers/staff members]
1. You must be polite, use common sense, and follow the international ettiquette regarding safety on the internet.
2. Taking part or getting involved in hacking critical infrastructure will get you the punishment same, as the hackers leading the operation.
3. You must keep your content below 18 - meaning you **cannot** have 18+ content on your profile picture/bio, and you cannot send content like this on public chatrooms.
4. Any discussions about piracy whether it includes ICv2 services or not is prohibited.
5. Breaking any of these rules may get you muted/kicked or banned depending on the severity and moderator's decision.

[Main rules]
1. By continuing to use ICv2 services, you agree to follow Terms of Service of both isopl.pl and icv2.cloud
2. You can also get muted/kicked/banned/ip-banned/terminated (account removal) for reasons that are not stated here. In this case, you have the right to appeal the punishment through the ICv2S bot. (dm)
3. Rules above can get updated without any notice sent here. We'll try to log any changes to the regulations on transparency channel, and we will also send an email to your account regarding the changes if it includes ToS change.
\`\`\`
### By using this server, you agree to all of the rules above.
Thank you for using our services!
`
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

export const about_server = [
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
            new TextDisplayBuilder().setContent(
`#  About Server
This server is solely focused on providing ICv2 (ISOPL Core v2) services to everyone, around the globe!
By joining this server, you have agreed to use it; meaning that regulations are now in action until you leave the server or delete your ICv2 account.
To continue using this server, make sure to create and link your ICv2 account with your current discord profile, in order to access all channels n features.

Anyways, hello there!
I'm ISOPL, the founder and CEO of [ICv2.cloud](<https://icv2.cloud/>) and [isopl.pl](<https://isopl.pl>) domains, and I love to see that someone uses my server!
If you would like to know more about me, I sincerely recommend you to check out my blogs on isopl.pl domain.
If you'd like to start using the full potential of this server, then icv2.cloud is perfect for you.
Again, it's good to have you here!
Best,
ISOPL, Founder of isopl.pl @ CEO of icv2.cloud

-# Thank you for using our services!
`
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

export async function settings_loggedIn(username, uuid, timeWithUs) {
    const uuidSliced = uuid.slice(0,5).toUpperCase();
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
            new TextDisplayBuilder().setContent(
`# Logged in as ${username} (#${uuidSliced})
### Account Settings:
[Use the dashboard instead](<https://system.icv2.cloud/dashboard/>)
### 

-# ${timeWithUs}
`
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
    ]
};

export const settings_notLoggedIn = [
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
            new TextDisplayBuilder().setContent(
`# You must be logged in to access this content.
[Login now!](<https://icv2.cloud/login>)

Already logged in?
Make sure to **link your account** with your discord one and try again.

-# Thank you for using our services!
`
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