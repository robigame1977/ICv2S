import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import config from './../config.js'
import functions from './functions.js';

// Setup __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const token = config.environment.discordToken
const clientId = config.environment.discordClientID
const guildId = config.environment.discordGuildID

if (!token || !clientId) {
    console.error('[ERROR] Missing DISCORD_TOKEN or CLIENT_ID environment variables.');
    process.exit(1);
}

function getFiles(dir) {
    let files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      if (item.isDirectory()) {
        files = [...files, ...getFiles(path.join(dir, item.name))];
      } else if (item.name.endsWith('.js')) {
        files.push(path.join(dir, item.name));
      }
    }
    return files;
}

// Load commands dynamically
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = getFiles(commandsPath);

async function commandTableUI(cmds) {
    functions.consoleMessages.secondary("------------------[ COMMANDS ]------------------")
    cmds.forEach(cmd => {
      functions.consoleMessages.secondary(`▫ /${cmd}`)
    });
    functions.consoleMessages.secondary("------------------------------------------------")
} 

export async function loadCommands(client) {
    functions.consoleMessages.secondary("Loading commands...")
    let count=0
    let validCount=0
    let cmds=[]
    for (const filePath of commandFiles) {
        const fileUrl = pathToFileURL(filePath).href;
        const command = await import(fileUrl);
        const commandFileName = path.basename(filePath, '.js'); 
        if (commandFileName === "path") continue;

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            cmds.push(command.data.name)
            validCount+=1
        } else {
            functions.consoleMessages.warn(`[Commands] The command at ${filePath} is missing "data" or "execute".`);
        }
        count+=1
    }
    await commandTableUI(cmds)
    functions.consoleMessages.info(`Successfully loaded ${validCount}/${count} commands!`)
}


const commands = [];

const rest = new REST({ version: '10' }).setToken(token);

// Variables are defined inside commandsHandler.js
export async function deploy() {
    for (const filePath of commandFiles) {
      const fileUrl = pathToFileURL(filePath).href;
      const command = await import(fileUrl);
      const commandFileName = path.basename(filePath, '.js'); 
      if (commandFileName === "path") continue;

      if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
      } else {
        functions.consoleMessages.warn(`[WARNING] Skipped ${filePath} due to missing "data" or "execute".`);
      }
    }

    try {
      functions.consoleMessages.secondary(`Started refreshing ${commands.length} application (/) commands.`);

      let data;
      if (guildId) {
        data = await rest.put(
          Routes.applicationGuildCommands(clientId, guildId),
          { body: commands }
        );
        functions.consoleMessages.info(`Successfully reloaded commands locally in Guild: ${guildId}`);
      } else {
        data = await rest.put(
          Routes.applicationCommands(clientId),
          { body: commands }
        );
        functions.consoleMessages.info('Successfully reloaded commands globally.');
      }
    } catch (error) {
      console.error(error);
    }
}
