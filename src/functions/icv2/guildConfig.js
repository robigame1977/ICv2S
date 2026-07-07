// Used to retrieve the configuration for this guild.
import axios from 'axios';
import * as icv2_config from './icv2Config.js'

export async function retrieveConfig(guildId) {
    if (!guildId) throw new Error("guildId cannot be empty")
    
    // GET https://system.icv2.cloud/v2/guildConfig/
    const response = await icv2_config.GET_request(`guildConfig/${guildId}`)
    if (response.code) if (response.code === 404) return false
    return response.data
}