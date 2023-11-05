const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ping pong'),
    async execute(interaction){
        // PONG
        await interaction.reply('Pong!');
    },
};