const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('apod')
        .setDescription('Astronomy Picture Of The Day!'),
    async execute(interaction){
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=93UvRBs00yyPiOdhdFM1sgHoH7tuJSfoN19UQSWp')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status code " + response.status);
                }
                return response.json();
            });
        if(response.hasOwnProperty('copyright')){
            copyright = response.copyright;
        }else{
            copyright = "No Copyright Found..."
        }

        const date = response.date;
        const explanation = response.explanation;
        const url = response.url;
        const title = response.title;

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