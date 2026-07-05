import { MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import r from './path.js'

export const data = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Janitor service')
    .addNumberOption(option =>
        option
            .setName('amount')
            .setDescription('Number of messages to delete')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(500)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

async function recursiveCleaning(interaction, amount) {
    if (amount > 100) {
        await interaction.channel.bulkDelete(100, true);
        await recursiveCleaning(interaction, amount-100);
    } else {
        await interaction.channel.bulkDelete(amount, true);
        return
    }
    
}

export async function execute(interaction) {
    const amount = interaction.options.getNumber('amount');
    if (interaction.user.id !== r.config.developerID && amount > 20) {
        return await interaction.reply("You can only purge up to **20 messages**.")
    }
    await interaction.deferReply({flags: MessageFlags.Ephemeral})

    if (amount > 100) {
        await recursiveCleaning(interaction, amount)
    } else {
        await interaction.channel.bulkDelete(amount, true);
    }
    
    await interaction.channel.send(`<@${interaction.user.id}> purged **${amount} messages**.`)
    await interaction.editReply(`Successfully deleted ${amount} messages.`);
}
