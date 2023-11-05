const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getavatar")
        .setDescription("Gets Avatar")
        .addUserOption((option) => option
            .setName('user')
            .setDescription('The User you wanna view')
            .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser("user") || interaction.user;
        await interaction.reply(user.displayAvatarURL());
    }
};