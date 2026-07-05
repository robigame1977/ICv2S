import { MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import r from './path.js'

export const data = new SlashCommandBuilder()
    .setName('infraction')
    .setDescription('Create an infraction')
    .addMentionableOption(opt =>
        opt
            .setName("user")
            .setDescription("User to moderate")
            .setRequired(true)
    )
    .addStringOption(opt =>
        opt
            .setName("punishment_type")
            .setDescription("Choose from the suggested options")
            .addChoices(
                { name: 'Warning', value: 'warning' },
                { name: 'Strike', value: 'strike' },
                { name: 'Demotion', value: 'demotion' },
                { name: 'Termination', value: 'termination' },
                { name: 'Staff Blacklist', value: 'staff blacklist' },
            )
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);

export async function execute(interaction) {
    const user = interaction.options.getUser('user');
    const punishmentType = interaction.options.getString('punishment_type');

    if (!user) {
        return interaction.reply({flags: MessageFlags.Ephemeral, content: "**You cannot infract a role**, duh."});
    }
    // Show modal
    await interaction.showModal(r.functions.getModals.infraction.infractionModal(user.id, punishmentType))
}
