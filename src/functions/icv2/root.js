import axios from 'axios';
import * as icv2_config from './icv2Config.js'

export async function getRootQuery() {
    const response = await icv2_config.GET_request(`root`)
    return response.data
}