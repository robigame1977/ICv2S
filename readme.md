# ICv2 Systems
"I believe I can do better."
Discord server invite: https://discord.gg/zBRDUE2fXw

Structure: Root based logic flow, no merging configuration (no ICv2F config type shit), file handlers

Introduce 3 system status:
- Production,
- Development, 
- Stable: Previous fully tested version


moderation commands, surveillance model, AI mode, auto-moderation, dashboard
Later: wiki, music commands, slash commands real-time management, custom commands support & custom prefix commands

### How to use ICv2S API 101
ICv2S API is basically an API that is heavily used by this bot. Obviously, as a developer itself, I would love to have fun with it so this bot will become a masterpiece.

**NOTICE!** In order to use the API, you need to:
- Have the configuration enabled,
- Pass the requests with API token (use config.js<environment>) in "Authorization" header
- Have the configuration on the database (you can create it via the dashboard at https://system.icv2.cloud/)

Without further ado:
- To retrieve config, we use "/v2/guildConfig/<guildId>" endpoint, it returns an SQL row of the configuration of the endpoint that is used inside config.js<init()>
- To add/set a configuration value (aka. append value with/without variable);
  - we use "/v2/guildConfig/<guildId>/<configVar>/<configVal>" for values that are "main values" inside JSON
  - we use "/v2/guildConfig/<guildId>/<configGroup>/<configVar>/<configVal>" for values that are inside of a group inside JSON
: Where;
  - <guildId> is the server's id
  - <configVar> is the configuration value name
  - <configVal> is the value we want <configVar> to be set
  - <configGroup> is the object group inside configuration that acts as "cd" command

### Tables cheatsheet
Users - id, userId (discord), userUUID (www), email, username, password, token, created_at, access (8bit<>specialCode)

### Quotes of the day
06.07.2026 - "Time flies by faster than I thought man"
03.07.2026 - "Taswell by C418 is goated"
02.07.2026 - "I am not a vibe coder if I can't use AI for coding effectively..."
01.07.2026 - "Time flies by like crazy man..."
28.06.2026 - "Well, that was a quite bit of a time since I last quoted.."
25.06.2026 - "I believe I can do better."