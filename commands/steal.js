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
        // Collect the emoji from the interaction and check if it is animated
        const emojiName = interaction.options.getString('emoji')
        const emojiCheck = emojiName.substring(0,2)
        const isAnimated = ((emojiName.substring(0,2) === "<a") ? true : false)
        
        //If this is not an emoji reply with this
        if(!((emojiCheck === "<:") || (emojiCheck === "<a"))){
            await interaction.reply("This is not an emoji...")
        }else{ //If the user supplies an emoji, use this
            const emojiId = (emojiName.split(':')[2]).split('>')[0]
            
            //Replies with a gif for the animated emojis, png for the rest
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