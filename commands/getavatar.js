const { ApplicationCommandOptionType, ApplicationCommandType, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getavatar")
        .setDescription("Gets Avatar")
        .addUserOption((option) => option
            .setName('user')
            .setDescription('The User you wanna view')
            .setRequired(true)),

    async execute(cmd) {
        const user = cmd.options.getUser("user") || cmd.user;
        await cmd.reply(user.displayAvatarURL());
    }
};