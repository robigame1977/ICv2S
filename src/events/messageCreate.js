import { ChannelType, Events, MessageFlags } from "discord.js";
import crypto from 'node:crypto';
import r from './path.js'

export default {
    name: Events.MessageCreate,
    async execute(message, client) {
        if (message.author.bot) return;

        const userId = message.author.id

        if (message.channel.type === ChannelType.DM) {
            if (client.applicationAnswers.has(userId)) {
                //application
                const answerText = message.content
                // userId, appType, qIndex, {answers}
                const session = client.applicationAnswers.get(userId);

                session.answers[`q${session.qIndex}`] = answerText;
                session.qIndex += 1;
                const appUUID = session.appUUID

                client.applicationAnswers.set(userId, session);

                const appMessage = r.functions.applications.questionMessage(session.qIndex, session.appType, false, appUUID)
                if (!appMessage) {
                    // Finished
                    try {
                        const resultsChannel = await client.channels.fetch(r.config.applications.resultsChannel);
                        const resultsMessage = await resultsChannel.send({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.applications_results.results(appUUID,session.appType,message.author.id,Date.now(),session.answers)})
                        r.functions.icv2.applications.create(userId, session.appType, appUUID, JSON.stringify(session.answers), resultsMessage.id)
                        message.channel.send({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.applications.finished(appUUID)})
                    } catch (err) {
                        console.error(err)
                        message.channel.send("An error has occured after finishing the application. Please check if the database is not down.")
                    }
                    return
                }

                message.channel.send({flags: MessageFlags.IsComponentsV2, components: appMessage})
            } else {
                message.channel.send("Direct Messages is not ready. Please activate them first by calling the bot to create application request for example.")
            }
        }
        
    }
}
