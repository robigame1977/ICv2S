import config from './../../config.js'
import fs from 'fs'
import path from 'path'

function compareVersions(newVer) {
    try {
        const versionPath = path.resolve('./version');
        const curVer = fs.readFileSync(versionPath, 'utf8').trim();
        return curVer === newVer.toString().trim();
    } catch (error) {
        console.error("Failed to read version file:", error.message);
        return false;
    }
}

export function init(root, consoleMessages, curVer) {
    if (!root) throw new Error("'root' value is undefined");
    const serverVersion = root.version
    if (!compareVersions(serverVersion)) {
        consoleMessages.warn(`
NOTICE! OUTDATED WARNING
NOTICE!
NOTICE! The current version of the bot: ${curVer}
NOTICE! New version of the bot: ${root.version}
NOTICE!
NOTICE! Thank you for using ISOPL Core v2
        `)
    }
    return true
}