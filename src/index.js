import { Client, Collection } from 'discord.js'
import functions from './functions/functions.js'
import config from './config.js'

const client = new Client({ intents: config.intents, partials: config.partials });
client.commands = new Collection();
client.applicationAnswers = new Collection();

await functions.coreHandler.validateRoot()
await functions.coreHandler.loadConfig()
await functions.coreHandler.deployCommands()
await functions.coreHandler.loadCommands(client)
await functions.coreHandler.loadEvents(client)
await functions.coreHandler.coreErrorResult()

functions.botLogin.init(client)