import config from './../../config.js'

function getToken() {
    const token = config.environment.discordToken;
    if (!token) {
        throw new Error('Missing DISCORD_TOKEN environment variable.');
    }  
    return token  
}

export default getToken