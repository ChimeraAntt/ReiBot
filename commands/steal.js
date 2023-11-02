const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('steal')
        .setDescription('Steal an Emoji')
        .addStringOption((option) => option
            .setName('emoji')
            .setDescription('Emoji to Steal')
            .setRequired(true)),
    async execute(interaction){
        const emojiName = interaction.options.getString('emoji')
        const emojiCheck = emojiName.substring(0,2)
        const isAnimated = ((emojiName.substring(0,2) === "<a") ? true : false)
        
        if(!((emojiCheck === "<:") || (emojiCheck === "<a"))){
            await interaction.reply("This is not an emoji...")
        }else{
            const emojiId = (emojiName.split(':')[2]).split('>')[0]
            
            if(isAnimated){
                const emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.gif`
                await interaction.reply({ files: [emojiURL]})
            }else{
                const emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.png`
                await interaction.reply({ files: [emojiURL]})
            }
        }
    }
}