import { ActivityType, Events } from 'discord.js';
import path from './path.js'

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        path.functions.consoleMessages.info(`Ready! Logged in as ${client.user.tag}`);
		path.functions.consoleMessages.secondary("ICv2 wishes you a great day!");
        client.user.setPresence({
            activities: [{ name: 'https://system.icv2.cloud/', type: ActivityType.Watching }],
            status: 'online', // 'online', 'idle', 'dnd', or 'invisible'
        });
        console.log("All events are up!")
    },
};
