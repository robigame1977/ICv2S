import { Events, MessageFlags } from "discord.js";
import r from './path.js'

export default {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const channel = await member.guild.channels.fetch('1520953310725542010').catch(() => null);
        
        if (!channel) return console.error("Welcome channel not found.");

        await channel.send({
            flags: MessageFlags.IsComponentsV2, 
            components: r.functions.getComponents.welcome.message(member.id)
        });
    }
}
