import axios from 'axios';
import * as icv2_config from './icv2Config.js'

export async function create(userId, appType, appUUID, answers, resultsMessage) {
    if (!userId) throw new Error("guildId cannot be empty")
    if (!appType || !appUUID || !answers || !resultsMessage) throw new Error("Invalid form body passed for applications.create - missing required fields")
    
    // GET https://system.icv2.cloud/v2/guildConfig/
    const response = await icv2_config.POST_request(`applications/${userId}/create`, {appType, appUUID, answers, resultsMessage})
    if (response.code) {
        if (response.code === 404) return false
        else throw new Error(`${response.data.error}`)
    }
    return response.data
}