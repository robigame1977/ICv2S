import config from './../../config.js'

function getToken() {
    const token = config.environment.discordToken;
    if (!token) {
        throw new Error('Missing DISCORD_TOKEN environment variable.');
    }  
    return token  
}

export function init(client) {
    if (!config.MDCER) client.login(getToken());
    else throw new Error("Stopped the bot process. You can now disable MDCER.")
}