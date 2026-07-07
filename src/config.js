// With the new project policy, we do not store any configuration related to events and commands.
// Example of what we store: index configuration, bot intents etc.
//
// Config is excluded from use when it comes to './db.js' due to possible hydration error.

import { GatewayIntentBits, Partials } from 'discord.js'
import r from './functions/functions.js'
import dotenv from 'dotenv'
dotenv.config()

let developerID = ["714828553916776499"];
const defaultGuildID = "1243290623252107396"; // used when provided none in .env
const alwaysDeploy = false;

// moreDetailedCoreErrorReview - it tells more about the core general error (it is not recommended to leave it on)
//
// for safety reasons, the bot wont launch until MDCER is turned off, due to the vulnerabilities it may expose.
const MDCER = false; 

///// Shared configuration /////
// 
// Values inside the variables inside the shared configuration section,
// will be used as a default fallback instead if the value inside
// database is NOT present. 
// To make it more clear: Variables with 'let' (not 'const') within
// the shared config section, are used for the shared configuration
//
// Tickets:
let supportRole = "1522298570697605373"
let hrRole = "1522298239330816061"

// Roles config (core - do not edit)
const hrRoles = [hrRole];
const supportRoles = [supportRole, ...hrRoles];
const newsRoles = [...supportRoles];

let tickets = {
    hrRoles: hrRoles,
    supportRoles: supportRoles,
    newsRoles: newsRoles,
    ticketsCategory: "1522312147726630922",
    ticketLogsChannel: "1522341862306877583",
    enableTickets: true,
    enableTranscripts: false,
};

let applications = {
    resultsChannel: "1523077423468646450",
    enableApplications: true,
}

let welcomeChannel = "1243290623252107400"

let imageAssets = {
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN40_WEi8F0UOeEJkMZ-1AwKlqBwxSZhcGjd_sbnrAaiJ9RmjOTD_BNgxU&s=10",
    banner_utility: "https://system.icv2.cloud/assets/banner_utility.jpg",
    banner_applications: "https://www.ucf.edu/wp-content/blogs.dir/20/files/2026/02/ucf-tips-for-job-interview.jpg",
    ruler: "https://system.icv2.cloud/assets/RULER.png"
}

let emojiAssets = {
    book: "<:bookmark:1521049102899482725>",
    user: "<:user:1522310235962736670>"
}

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping
]

const partials = [
    Partials.Channel,
    Partials.Message,
]

const environment = {
    discordToken: process.env.DISCORD_TOKEN,
    discordClientID: process.env.DISCORD_CLIENT_ID,
    discordGuildID: process.env.DISCORD_GUILD_ID,
    apiKey: process.env.ICV2_API_KEY
}

// Extract the id for the emojis inside selectMenus
function emojiId(emojiSnowflake) {
    const match = emojiSnowflake.match(/\d+$/);
    return match ? match[0] : null;
}

function applyConfig(configVal, configVar) { 
    if (configVal) { 
        r.consoleMessages.secondary(`・Loaded ${configVar} from database`)
        configVar = configVal
    }; 
}

async function init() {
    // Get config from config table duh
    const configEntry = await r.icv2.guildConfig.retrieveConfig(environment.discordGuildID)
    if (!configEntry) {
        r.consoleMessages.warn("NOTICE! You do not have any configuration created for the bot.\nNOTICE! To create one, please issue the config creation from your ICv2S panel.\nNOTICE! Using default configuration as a fallback.\nNOTICE!\nNOTICE! Keep in mind that ICv2S network features may not be available in this current state due to the lack of service_token.")
        return false
    }
    const config = configEntry.configuration

    if (configEntry.server_admin) developerID.push(...config.developerID)
    if (configEntry.disabled) throw new Error("Your ICv2S configuration is disabled, please check the inbox or contact the administrator.")

    if (config) {
        r.consoleMessages.secondary(`------ Remote configuration ------`)
        // Tickets
        applyConfig(config.tickets.supportRole, supportRole)
        applyConfig(config.tickets.hrRole, hrRole)
        applyConfig(config.tickets.ticketCategory, tickets.ticketsCategory)
        applyConfig(config.tickets.ticketLogsChannel, tickets.ticketLogsChannel)
        applyConfig(config.tickets.enableTickets, tickets.enableTickets)
        applyConfig(config.tickets.enableTranscripts, tickets.enableTranscripts)

        // Applications
        applyConfig(config.applications.resultsChannel, applications.resultsChannel)
        applyConfig(config.applications.enableApplications, applications.enableApplications)   
        r.consoleMessages.secondary(`---- End Remote configuration ----`)
    } else {
        r.consoleMessages.secondary("Remote configuration for this guildId is empty.")
    }

    //todo - add assets support later

    r.consoleMessages.info("Loaded configuration from ICv2S shared database.")
    return true
}

/* ------------------ //
// developer configuration
// features configuration
// assets configuration
// bot configuration + environment keys
// functions
// ------------------ */

export default {
    developerID, alwaysDeploy, MDCER,
    tickets, applications, welcomeChannel,
    imageAssets, emojiAssets,
    intents, partials, environment,
    emojiId,
    init
}