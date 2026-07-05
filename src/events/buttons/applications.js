import { MessageFlags, PermissionFlagsBits } from 'discord.js'
import r from '../path.js'

export async function handle(interaction) {
    if (!r.config.applications.enableApplications) return await interaction.reply({flags: MessageFlags.Ephemeral, content: "**Applications have been disabled by the server administrator.** Please try again later or contact the administrator."})
    const [_, action, data] = interaction.customId.split("::")
    await interaction.user.createDM();

    switch (action) {
        case "begin":
            await interaction.reply("Success. To begin the application, send a message with your discord username.");
            // userId, appType, qIndex, {answers}
            const appUUID_new = crypto.randomUUID();
            interaction.client.applicationAnswers.set(interaction.user.id, {appType: data, appUUID: appUUID_new, qIndex: 1, answers: {}});
            await interaction.message.edit({flags: MessageFlags.IsComponentsV2, components: r.functions.getComponents.applications.mainDMs_withoutButtons(data)});
            break;
        case "cancel":
            await interaction.deferReply({flags: MessageFlags.Ephemeral})
            const appUUID = data
            try {
                const [rows] = await r.db.query("SELECT * FROM applications WHERE app_uuid = ?", [appUUID]);
                if (rows.length <= 0) return await interaction.editReply({flags: MessageFlags.Ephemeral, content: "There is no pending application in the database."})
            } catch (error) {
                console.error("Database Error:", error);
                await interaction.editReply("An error occurred while fetching your application.");
            }
            if (data === "intro") {
                await interaction.message.delete();
                return await interaction.editReply("**Successfully cancelled the application.** Mistake? You can always create a new one!")
            }
            await r.db.query("DELETE FROM applications WHERE app_uuid = ?", [appUUID])
            await interaction.editReply("**Successfully cancelled the application.** Mistake? You can always create a new one!")
            break;
        case "accept":
        case "deny":
            return await interaction.reply("This button's logic is not ready in the current version of ICv2S. Please update to latest one if available.")
        default:
            return await interaction.reply("Undefined button. Please try again later or contact us via tickets.");
    }
}