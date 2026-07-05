// The plan is simple: Get the index count -> Get the correct message -> Get the component and send the message -> return void

import * as applicationsComponents from './components/applications.js'

function supportAgentApplication(index_count) {
    const questionString = `q${index_count}`

    switch (questionString) {
        case "q1":
            return "What's your discord username?"
        case "q2":
            return "What's your timezone?"
        case "q3":
            return false
            return "How much are you active on discord?"
        case "q4":
            return "Explain what Support Agent means for you."
        case "q5":
            return "Tell us more about yourself."
        case "q6":
            return "Explain, why do you want to become a Support Agent."
        case "q7":
            return "Have you been a support agent before? If yes, list the experience."
        case "q8":
            return "Are you experienced with Google Sheets? If yes, for how long and how much."
        case "q9":
            return "Imagine this scenario: You are on a position of a support agent and a new ticket appears. It is regarding the news request. Explain when, how and why will you accept/deny the request. (3+ for each, total >=6)"
        default:
            return false
    }
}

export function questionMessage(index_count, application_type, rawMessage, appUUID) {
    if (!rawMessage && !appUUID) throw new Error("'appUUID' value must be present when calling components.")
    const appMessage = supportAgentApplication(index_count)
    if (!appMessage) {
        return false
    }

    if (rawMessage) return appMessage
    return applicationsComponents.questionMessage(index_count, appMessage, appUUID);
}