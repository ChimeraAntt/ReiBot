const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const  { nasaKey } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apod')
        .setDescription('Astronomy Picture Of The Day!'),
    async execute(interaction){
        // Collect response from the API
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status code " + response.status);
                }
                return response.json();
            });

        // Create variables for the response
        if(response.hasOwnProperty('copyright')){ //Check for copyright info
            copyright = response.copyright;
        }else{
            copyright = "No Copyright Found..."
        }
        const date = response.date;
        const explanation = response.explanation;
        const url = response.url;
        const title = response.title;

        // Create and send an Embed
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setColor(0,0,0)
            .setDescription(explanation)
            .setAuthor({name: "APOD"})
            .setImage(url)
            .setFooter({text: `Date: ${date}, Copyright: ${copyright}`})
        await interaction.reply({ embeds : [embed], fetchReply : true})

    },
};