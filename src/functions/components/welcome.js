import { MediaGalleryBuilder, MediaGalleryItemBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder } from 'discord.js';
import config from './../../config.js'

export function message(userid) { 
    return [
    new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`👋 **Welcome <@${userid}> to the server!** Hope you enjoy your stay.`),
        )
        .addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel(`${membersCount}`)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("icv2.cloud")
                        .setURL("https://icv2.cloud/"),
                ),
        ),
];}