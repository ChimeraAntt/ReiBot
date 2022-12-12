const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('displays info on a user'),
    async execute(interaction){
        await interaction.reply('This command was run by `' + interaction.user.username + '`, who joined on ' + `<t:${Math.round(interaction.member.joinedAt /1000 )}:F>` + '.');
    },
};