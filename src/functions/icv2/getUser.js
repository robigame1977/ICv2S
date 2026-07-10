import axios from 'axios';
import * as icv2_config from './icv2Config.js'

export async function byUserID(userId) {
    if (!userId) throw new Error("userId cannot be empty")
    
    const response = await icv2_config.GET_request(`getUser/${userId}`)
    if (response.code) {
        if (response.code === 404) return false
        else throw new Error(`${response.data.error}`)
    }
    return response.data
}