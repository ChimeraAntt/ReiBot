const { SlashCommandBuilder, EmbedBuilder, channelLink, time } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll with two options')
        .addStringOption((option) => option
            .setName('poll')
            .setDescription('add a name to your poll')
            .setRequired(true))
        .addStringOption((option) => option
            .setName('one')
            .setDescription("first option")
            .setRequired(true))
        .addStringOption((option) => option
            .setName('two')
            .setDescription("second option")
            .setRequired(true)),
    async execute(interaction){
        const pollName = interaction.options.getString("poll");
        const optionOne = interaction.options.getString("one");
        const optionTwo = interaction.options.getString("two");

        const pollEmbed = new EmbedBuilder()
            .setColor("Black")
            .setTitle(pollName)
            .setAuthor({name: "Ayanami Polls"})
            .setDescription("An interesting poll")
            .addFields(
                { name: 'Option One', value: optionOne, inline: true },
                { name: 'Option Two', value: optionTwo, inline: true},
            );

        const message = await interaction.reply({ embeds: [pollEmbed], fetchReply: true});
        message.react('1️⃣');
        message.react('2️⃣');
    },
};