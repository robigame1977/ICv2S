import { Events, MessageFlags } from "discord.js";
import r from './path.js'

export default {
    name: Events.GuildMemberAdd,
    async execute(member) {
        if (!r.config.welcomeChannel) return r.functions.consoleMessages.secondary("Welcome channel not defined, skipping.")
        const channel = await member.guild.channels.fetch(r.config.welcomeChannel).catch(() => null);
        
        if (!channel) return r.functions.consoleMessages.secondary("Welcome channel not found.");

        await channel.send({
            flags: MessageFlags.IsComponentsV2, 
            components: r.functions.getComponents.welcome.message(member.id)
        });
    }
}
