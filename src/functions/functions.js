import icv2 from './icv2.js'
import * as consoleMessages from './consoleMessages.js'
import * as commandsHandler from './commandsHandler.js'
import * as applications from './applications.js'
import eventsHandler from './eventsHandler.js'
import getComponents from './getComponents.js'
import getModals from './getModals.js'

import * as botLogin from './validators/botLogin.js'
import * as coreHandler from './validators/coreHandler.js'
import * as rootValidate from './validators/rootValidate.js'

import * as accountStats from './utils/accountStats.js'

export default {
    icv2, consoleMessages, commandsHandler, eventsHandler, getComponents, getModals, applications,
    botLogin, coreHandler, rootValidate,
    accountStats,
}