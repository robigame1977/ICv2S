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
Do you want to join us? It's your lucky day! Select from the options below to fit your needs well.

**Support Agent:** Help others in need on designated ticket channels,
**Internal Affairs:** Manage the internal affairs regarding the server,
**News Department:** Contribute into creating awesome news as news anchor or some kind of technician!
**News Department Management:** Step up on a higher rank instead if you believe that is what you want.
`), // Be right back - eatin dinner rn :)
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