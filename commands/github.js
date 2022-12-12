const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gihub')
        .setDescription('The Github Repo'),
    async execute(interaction){
        await interaction.reply('https://github.com/ChimeraAntt/ReiBot');
    },
};