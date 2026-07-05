import { MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import r from './path.js'

export const data = new SlashCommandBuilder()
    .setName('promotion')
    .setDescription('Create a promotion')
    .addMentionableOption(opt =>
        opt
            .setName("user")
            .setDescription("User to promote")
            .setRequired(true)
    )
    .addRoleOption(opt =>
        opt
            .setName("new_role")
            .setDescription("To what role promote the user?")
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);

export async function execute(interaction) {
    const user = interaction.options.getUser('user');
    const newRole = interaction.options.getRole('new_role');

    const botMember = interaction.guild.members.me;

    if (!user) { return interaction.reply({flags: MessageFlags.Ephemeral, content: "**You cannot promote a role**, duh."}); }

    if (newRole.position >= interaction.member.roles.highest.position) {
        return interaction.reply({flags: MessageFlags.Ephemeral, content: "**You cannot promote the user with the role that is above or equal to yours.**"});
    }

    if (newRole.position >= botMember.roles.highest.position) {
        return interaction.reply({flags: MessageFlags.Ephemeral, content: "**The bot cannot promote the user due to the bot being below the selected role.**\nMove the bot's role above the selected role (or just choose a different role) and try again."});
    }
    // Show modal
    await interaction.showModal(r.functions.getModals.promotion.promotionModal(user.id, newRole))
}
