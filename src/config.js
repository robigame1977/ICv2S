// With the new project policy, we do not store any configuration related to events and commands.
// Example of what we store: index configuration, bot intents etc.

import { GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const developerID = "714828553916776499";
const defaultGuildID = "1243290623252107396"; // used when provided none in .env
const alwaysDeploy = false;

// Roles config
const hrRoles = ["1522298239330816061"];
const supportRoles = ["1522298570697605373", ...hrRoles];
const newsRoles = [...supportRoles];

const tickets = {
    hrRoles: hrRoles,
    supportRoles: supportRoles,
    newsRoles: newsRoles,
    ticketsCategory: "1522312147726630922",
    transcriptsChannel: "1522341862306877583"
};

const imageAssets = {
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN40_WEi8F0UOeEJkMZ-1AwKlqBwxSZhcGjd_sbnrAaiJ9RmjOTD_BNgxU&s=10",
    banner_utility: "https://system.icv2.cloud/assets/banner_utility.jpg",
    banner_applications: "https://www.ucf.edu/wp-content/blogs.dir/20/files/2026/02/ucf-tips-for-job-interview.jpg",
    ruler: "https://system.icv2.cloud/assets/RULER.png"
}

const emojiAssets = {
    book: "<:bookmark:1521049102899482725>",
    user: "<:user:1522310235962736670>"
}

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages
]

const environment = {
    discordToken: process.env.DISCORD_TOKEN,
    discordClientID: process.env.DISCORD_CLIENT_ID,
    discordGuildID: process.env.DISCORD_GUILD_ID,
    databaseHost: process.env.DATABASE_HOST,
    databasePort: process.env.DATABASE_PORT,
    databaseName: process.env.DATABASE_NAME,
    databaseUsername: process.env.DATABASE_USERNAME,
    databasePassword: process.env.DATABASE_PASSWORD,
}

// Extract the id for the emojis inside selectMenus
function emojiId(emojiSnowflake) {
    const match = emojiSnowflake.match(/\d+$/);
    return match ? match[0] : null;
}

export default {
    developerID, alwaysDeploy,
    tickets,
    imageAssets, emojiAssets,
    intents, environment,
    emojiId,
}