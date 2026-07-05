import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import functions from './functions.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function eventTableUI(events) {
    functions.consoleMessages.secondary("-------------------[ EVENTS ]-------------------")
    events.forEach(event => {
        functions.consoleMessages.secondary(`▫ ${event}`)
    });
    functions.consoleMessages.secondary("------------------------------------------------")
} 

export default async function loadEvents(client) {
    const eventsPath = path.resolve(__dirname, '../events/');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    let events = []
    let count = 0
    let invalidCount = 0

    functions.consoleMessages.secondary("Loading events...")

    for (const file of eventFiles) {
        if (file === "path.js") continue;
        count += 1
        const filePath = path.join(eventsPath, file);
        const fileUrl = pathToFileURL(filePath).href;
        
        const event = await import(fileUrl);

        const eventData = event.default || event;

        if (!eventData.name || typeof eventData.execute !== 'function') {
            functions.consoleMessages.warn(`[WARNING] Event file "${file}" is missing a "name" or "execute" function.`);
            invalidCount += 1
            continue;
        }

        if (eventData.once) {
            client.once(eventData.name, (...args) => eventData.execute(...args, client));
        } else {
            client.on(eventData.name, (...args) => eventData.execute(...args, client));
        }

        events.push(eventData.name)
    }

    await eventTableUI(events)
    functions.consoleMessages.info(`Successfully loaded ${count-invalidCount}/${count} events!`)
    return (count-invalidCount===count)
}
