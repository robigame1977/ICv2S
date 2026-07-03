import { Events, MessageFlags } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import r from './path.js'

// Setup __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

async function findEvent(eventName, parent) {
    if (!eventName) { return r.functions.consoleMessages.error("Value 'eventName' is null in interactionCreate.js<>findEvent()") }
    if (!["selectMenu", "buttons", "modals"].includes(parent)) throw new ReferenceError("findEvent() only takes 'selectMenu', 'buttons', and 'modals' as a parent; given " + parent)
    const eventsPath = path.join(__dirname, `/${parent}`);
    const eventFiles = getFiles(eventsPath);

    for (const filePath of eventFiles) {
        const fileUrl = pathToFileURL(filePath).href;
        const event = await import(fileUrl);
        const eventFileName = path.basename(filePath, '.js');
        if (eventFileName === eventName) return filePath 
    }
    console.log("Cannot find event: " + eventName)
    return null
}

async function handleStringSelectMenu(interaction) {
    const handlerFile = interaction.customId

    const eventFile = await findEvent(handlerFile, "selectMenu")
    if (!eventFile) return r.functions.consoleMessages.error(`No event file '${handlerFile}.js' found in /selectMenu/`);
    const event = await import(eventFile)
    
    const executeMethod = event.handle || event.default?.handle;
        
    if (executeMethod) {
        await executeMethod(interaction);
    } else {
        console.error(`No handle function found in ${handlerFile}`);
    }
}

async function handleModal(interaction) {
    const handlerFile = interaction.customId.split("::")[0]

    const eventFile = await findEvent(handlerFile, "modals")
    if (!eventFile) return r.functions.consoleMessages.error(`No event file '${handlerFile}.js' found in /modals/`);
    const event = await import(eventFile)
    
    const executeMethod = event.handle || event.default?.handle;
        
    if (executeMethod) {
        await executeMethod(interaction);
    } else {
        console.error(`No handle function found in ${handlerFile}`);
    }
}

async function handleButton(interaction) {
    const handlerFile = interaction.customId.split("::")[0]

    const eventFile = await findEvent(handlerFile, "buttons")
    if (!eventFile) return r.functions.consoleMessages.error(`No event file '${handlerFile}.js' found in /buttons/`);
    const event = await import(eventFile)
    
    const executeMethod = event.handle || event.default?.handle;
        
    if (executeMethod) {
        await executeMethod(interaction);
    } else {
        console.error(`No handle function found in ${handlerFile}`);
    }
}

export default {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        // ICv2S Policy s3.1 (thou shall not use outside authorized servers; <add later database quering>)
        if (![r.config.environment.discordGuildID, "1243290623252107396"].includes(interaction.guild.id)) {
            // system.icv2.cloud/wiki/err#s301 
            return await interaction.reply({flags: MessageFlags.Ephemeral, content: "This server is not authorized in ICv2S official database.\n-# [Read more about this error](<https://icv2.cloud/>)"})
        }

        if (interaction.isStringSelectMenu()) return await handleStringSelectMenu(interaction);
        else if (interaction.isModalSubmit()) return await handleModal(interaction);
        else if (interaction.isButton()) return await handleButton(interaction);

        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            const replyOptions = { content: 'There was an error executing this command!', ephemeral: true };
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(replyOptions);
            } else {
                await interaction.reply(replyOptions);
            }
        }
    },
};
