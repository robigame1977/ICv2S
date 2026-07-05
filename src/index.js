import { Client, Collection } from 'discord.js'
import functions from './functions/functions.js'
import config from './config.js'

const client = new Client({ intents: config.intents, partials: config.partials });
client.commands = new Collection();
client.applicationAnswers = new Collection();

if (config.alwaysDeploy) await functions.commandsHandler.deploy()
await functions.commandsHandler.loadCommands(client)
await functions.eventsHandler(client)

client.login(functions.getToken());
