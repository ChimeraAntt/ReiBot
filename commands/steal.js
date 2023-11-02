const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('steal')
        .setDescription('Steal an Emoji')
        .addStringOption((option) => option
            .setName('emoji')
            .setDescription('Emoji to Steal')
            .setRequired(true))
        .addStringOption((option) => option
            .setName('type')
            .setDescription('gif or png?')
            .setRequired(true)
            .addChoices({ name: "PNG", value: 'png' }, { name: "GIF", value: 'gif'}))
        .setDefaultMemberPermissions(1 << 30),
    async execute(interaction){
        const emoji = interaction.options.getString('emoji');
        const choice = interaction.options.getString('type');
        const emojiId1 = emoji.split(':')[2];
        const emojiId = emojiId1.split('>')[0];
        if(choice === 'png'){
            const emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.png`
            await interaction.reply({ files: [emojiURL]})
        }else if(choice === 'gif'){
            const emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.gif`
            await interaction.reply({ files: [emojiURL]})
        }
    }
}