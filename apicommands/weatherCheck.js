const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const  { weatherKey } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather_check')
        .setDescription('Check the Weather!')
        .addStringOption((option) => option
            .setName("place")
            .setDescription("Example: Town USA")
            .setRequired(true)),
    async execute(interaction){
        // Collect the location name from the user input 
        const locationOption = `"${interaction.options.getString('place')}"`; 

        // The URLs for the weather and astronomy endpoints of the weather API
        const weatherURL = `http://api.weatherapi.com/v1/current.json?`
        const astroURL = `http://api.weatherapi.com/v1/astronomy.json?`

         //If at any point in the process, something goes wrong this will catch it
        try{
            // Attempt to collect the weather info at the users location
            const weatherCheck = await fetch(weatherURL + new URLSearchParams({
                key: weatherKey,
                q: locationOption
            })).then(response => {
                    if(!response.ok){
                        throw new Error("HTTP status code " + response.status)
                    }
                    return response.json()
                }
            )

            // Attempt to collect the astronomy info at the users location
            const starCheck = await fetch(astroURL + new URLSearchParams({
                key: weatherKey,
                q: locationOption
            })).then(response => {
                    if(!response.ok){
                        throw new Error("HTTP status code " + response.status)
                    }
                    return response.json()
                }
            )

            // Create the variables for the response
            const location = weatherCheck.location
            const current = weatherCheck.current
            const condition = current.condition
            const astro = starCheck.astronomy.astro

            const locationName = `${location.name}, ${location.region}, ${location.country}`
            const localTime = location.localtime

            const temp = [current.temp_f, current.temp_c]
            const tempFeelsLike = [current.feelslike_f, current.feelslike_c]
            const wind = [current.wind_mph, current.wind_kph, current.wind_dir]
            
            const skyCondition = condition.text

            const sunrise = astro.sunrise
            const sunset = astro.sunset
            const moonrise = astro.moonrise
            const moonset = astro.moonset
            const moonPhase = astro.moon_phase
            
            // Create the attachment and embed for the response, and then send the response.
            const file = new AttachmentBuilder("./images/pfp.jpg")
            const embed = new EmbedBuilder()
                    .setTitle(`Weather in ${locationName}`)
                    .setAuthor({name: "Ayanami Weather", iconURL: "attachment://pfp.jpg"})
                    .setColor("#0076A2")
                    .setFooter({text: `Current Time in ${location.name}: ${localTime}`})
                    .setFields(
                        { name: "Temperature", value: `${temp[0]}F (${temp[1]}C)`},
                        { name: "Feels Like", value: `${tempFeelsLike[0]}F (${tempFeelsLike[1]}C)`},
                        { name: "Wind Speed", value: `${wind[0]}mph (${temp[1]}kph) ${wind[2]}`},
                        { name: "Sky Condition", value: `${skyCondition}`},
                        { name: "The Sun", value: `Rise: ${sunrise}, Set: ${sunset}`},
                        { name: "The Moon", value: `Rise: ${moonrise}, Set: ${moonset}, Phase: ${moonPhase}`},
                    )
            await interaction.reply({ embeds: [embed], files: [file] });
        }catch(error){ // In case of error 
            console.log(error)
            await interaction.reply("Something went wrong, please try again...")
        }
    },
};