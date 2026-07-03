import chalk from 'chalk'

const infoColor = chalk.hex("#69beff")
const secondaryColor = chalk.hex("#698295")
const warningColor = chalk.hex("#ffb766")
const errorColor = chalk.hex("#ff6d6d")

export function info(message) {
    return console.log(infoColor(message))
}
export function secondary(message) {
    return console.log(secondaryColor(message))
}
export function warn(message) {
    return console.log(warningColor(message))
}
export function error(message) {
    return console.log(errorColor(message))
}