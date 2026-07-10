// Configuration Utility for ICv2 Services
//
// Used for managing the way the traffic is created by this bot.
import config from './../../config.js'
import * as consoleMessages from './../consoleMessages.js'
import axios from 'axios'

export {config, consoleMessages}

export const apikey = config.environment.apiKey
if (!apikey) throw new Error("ICV2_API_KEY must be provided inside .env")

export const logErrors = false; // log those pesky catch(err) inside axios

export const use_localhost = true
export const base_url = (use_localhost) ? "http://localhost:3001/v2" : "https://system.icv2.cloud/v2"

export async function GET_request(endpoint) {
    if (!endpoint) throw new Error("Endpoint value cannot be nil");

    try {
        const response = await axios.get(`${base_url}/${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${apikey}`,
            'Accept': 'application/json',
            'X-GUILD-ID': `${config.environment.discordGuildID}`
            }
        });

        return response
    } catch (error) {
        console.log(error)
        if (error.code === "ECONNREFUSED") {
            if (use_localhost) throw new Error("It seems that ICv2S web infrastructure on localhost is down. Please enable the server, fix errors or switch back to globalized solution.")
            throw new Error("It seems that ICv2S web infrastructure is down. Please try again later")
        }
        if (error.response.status) {
            if (error.response.status === 404) return {code: 404, error}
            if (error.response.status === 401) throw new Error(`You are missing permissions to use ${endpoint}\n- ${error.response.data.error}\n`)
        }
        if (error.response && logErrors) {
            console.error('Data:', error.response.data);
            console.error('Status:', error.response.status);
        } else if (logErrors) {
            console.error('Error Message:', error.message);
        }
        return {code:500, error}
    }
}

export async function POST_request(endpoint, body) {
    if (!endpoint) throw new Error("Endpoint value cannot be nil")
    const response = await axios.post(`${base_url}/${endpoint}`, body, {
        headers: {
            'Authorization': `Bearer ${apikey}`,
            'Accept': 'application/json',
            'X-GUILD-ID': `${config.environment.discordGuildID}`
            }
    });
    return response
}