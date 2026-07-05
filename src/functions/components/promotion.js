import { MediaGalleryBuilder, MediaGalleryItemBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder } from 'discord.js';
import config from '../../config.js'

export function message(moderator_id, moderated_id, new_role, reason, note) {
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
                new TextDisplayBuilder().setContent(`# Promotion ; <@${moderated_id}>
Issued by <@${moderator_id}>

### 🎉 Congratulations on getting promoted to ${new_role}!
\`\`\`
${reason}
\`\`\`

Moderator's note: \`${note}\`

Thank you for contributing to our server!
`),
            )
    ];
}