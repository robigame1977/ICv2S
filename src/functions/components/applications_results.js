import { MediaGalleryBuilder, MediaGalleryItemBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder } from 'discord.js';
import config from './../../config.js'
import * as applications from '../applications.js'

export function results(application_uuid, application_type, application_author_id, application_datetime, application_answers) {
    const container = new ContainerBuilder();
    const unixTimestamp = Math.floor(new Date(application_datetime).getTime() / 1000);

    let answers = application_answers;
    
    if (typeof answers === 'string') {
        try { answers = JSON.parse(answers); } catch (e) { answers = [answers]; }
    }

    if (typeof answers === 'object' && !Array.isArray(answers) && answers !== null) {
        answers = Object.values(answers); 
    }

    if (!Array.isArray(answers)) answers = [answers];

    container.addTextDisplayComponents(
        new TextDisplayBuilder().setContent(`# New Application\nSent by <@${application_author_id}> <t:${unixTimestamp}:R>`)
    );

    answers.forEach((answer, index) => {
        const questionResult = applications.questionMessage(index + 1, application_type, true);
        const questionText = (typeof questionResult === 'object' && questionResult !== null) 
            ? (questionResult.content || questionResult.label || "Unknown Question") 
            : questionResult;

        const answerString = (typeof answer === 'object') ? JSON.stringify(answer, null, 2) : String(answer);

        container.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`### ${index + 1}. ${questionText}\n\`\`\`\n${answerString}\n\`\`\``)
        );
    });

    container.addActionRowComponents(
        new ActionRowBuilder().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Accept").setCustomId(`applications::accept::${application_uuid}`),
            new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Deny").setCustomId(`applications::deny::${application_uuid}`),
            new ButtonBuilder().setLabel("icv2.cloud").setStyle(ButtonStyle.Link).setURL("https://icv2.cloud")
        )
    );

    return [container]; 
}

