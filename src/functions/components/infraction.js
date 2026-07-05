import { MediaGalleryBuilder, MediaGalleryItemBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder } from 'discord.js';
import config from './../../config.js'

export function message(moderator_id, moderated_id, punishment_type, reason, note) {
    if (!["warning", "strike", "demotion", "termination", "staff blacklisted"].includes(punishment_type)) throw new TypeError(`Infraction.message() component takes only 'warning', 'strike', 'demotion', 'termination' or 'staff blacklist' as value for punishment_type; given '${punishment_type}'`)
    let infractionText
    if (punishment_type === "warning") infractionText = `warned`;
    else if (punishment_type === "strike") infractionText = `striked`;
    else if (punishment_type === "demotion") infractionText = `demoted`;
    else if (punishment_type === "termination") infractionText = "terminated";
    else infractionText = "staff blacklisted";

    if (!note) note = "-"


    return [
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
                new TextDisplayBuilder().setContent(`# Infraction ; <@${moderated_id}>
Issued by <@${moderator_id}>

Unfortunately, you have been **${infractionText}** for the following reason below:
\`\`\`
${reason}
\`\`\`

Moderator's note: \`${note}\`

If you think this is an invalid infraction, let us know via high rank tickets!
`),
            )
    ];
}