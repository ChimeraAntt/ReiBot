const { SlashCommandBuilder } = require("discord.js");

// TODO remake this!!!
module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('displays info on the server'),
    async execute(interaction){
        await interaction.reply('This server is ' + interaction.guild.name + ' and has ' + interaction.guild.memberCount + ' members.');
    },
};