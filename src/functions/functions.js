import * as consoleMessages from './consoleMessages.js'
import * as commandsHandler from './commandsHandler.js'
import * as applications from './applications.js'
import eventsHandler from './eventsHandler.js'
import getComponents from './getComponents.js'
import getModals from './getModals.js'

import * as botLogin from './validators/botLogin.js'
import * as coreHandler from './validators/coreHandler.js'

import * as accountStats from './utils/accountStats.js'

import pool from './../db.js'

export default {
    consoleMessages, commandsHandler, eventsHandler, getComponents, getModals, applications,
    botLogin, coreHandler,
    accountStats,
    pool,
}