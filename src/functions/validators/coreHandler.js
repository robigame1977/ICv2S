import config from './../../config.js'
import functions from './../functions.js'

let coreErrorCount = 0

export async function mdcer_report(coreErrorFeature, functionToTrigger, args) {
    if (!config.MDCER) return
    functions.consoleMessages.info(
    `\n
[MDCER]
Current coreErrorCount: ${coreErrorCount+1}
Core feature that failed: ${coreErrorFeature}

Calling the function again to catch the error...
    `)
    try {
        const functionResponse = await functionToTrigger(args)
        functions.consoleMessages.info("RETURNED: " + functionResponse)
    } catch (err) {
        functions.consoleMessages.info("Function returned error:")
        console.error(err)
    }
    functions.consoleMessages.info(`MDCER report protocol end. (${coreErrorFeature})\n\n`)
}

export async function loadConfig() {
    if (await config.init() === false) {
        await mdcer_report("config.init()", config.init)
        coreErrorCount+=1;
    }
}

export async function deployCommands() {
    if (config.alwaysDeploy) {
        if (await functions.commandsHandler.deploy() === false) {
            await mdcer_report("deployCommands()", functions.commandsHandler.deploy)
            coreErrorCount+=1;
        }
    }
}

export async function loadCommands(client) {
    if (await functions.commandsHandler.loadCommands(client) === false) {
        await mdcer_report("loadCommands(client)", functions.commandsHandler.loadCommands, client)
        coreErrorCount+=1;
    }
}

export async function loadEvents(client) {
    if (await functions.eventsHandler(client) === false) {
        await mdcer_report("loadEvents(client)", functions.eventsHandler, client)
        coreErrorCount+=1;
    }
}

export async function coreErrorResult() {
    if (coreErrorCount>2) functions.consoleMessages.error(`C:${coreErrorCount} | Some of the core features have reported an error. Please review it or contact server administrator.`)
    else if (coreErrorCount>0) functions.consoleMessages.warn(`C:${coreErrorCount} | Some of the core features have reported an error. Please review it or contact server administrator.`)
}