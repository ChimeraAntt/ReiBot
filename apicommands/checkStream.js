const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const  { twitchAuth, twitchId } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check_stream')
        .setDescription('Check if a person is streaming!')
        .addStringOption((option) => option
            .setName("streamer")
            .setDescription("check this streamer")
            .setRequired(true)),
    async execute(interaction){
        const streamer = interaction.options.getString('streamer');
        try{
            streaming = await fetch(
                `https://api.twitch.tv/helix/streams?user_login=${streamer}`,
                {
                    headers: {
                        'Authorization': `Bearer ${twitchAuth}`,
                        'Client-Id': `${twitchId}`
                    }
                }
            );
            console.log("Success")
        } catch (error){
            await interaction.reply("Couldnt find this user?")
        }


        not_streaming = await fetch(`https://api.twitch.tv/helix/users?login=${streamer}`, {
            headers: {
                'Authorization': `Bearer ${twitchAuth}`,
                'Client-Id': `${twitchId}`
            }
        });

        const streamingJSON = await streaming.json();
        const nstreamingJSON = await not_streaming.json();

        if(Object.keys(streamingJSON.data).length === 0){
            const username = nstreamingJSON.data[0].display_name;
            const pfp = nstreamingJSON.data[0].profile_image_url;
            const link = `https://www.twitch.tv/${username}`
            const embed = new EmbedBuilder()
                .setTitle(`${username} is not streaming...`)
                .setDescription("Come back later")
                .setAuthor({name: username, iconURL: pfp})
                .setColor(48,0,242)
                .setURL(link)

            await interaction.reply({ embeds : [embed], fetchReply : true});
        }else{
            const username = streamingJSON.data[0].user_name;
            const game_name = streamingJSON.data[0].game_name;
            const title = streamingJSON.data[0].title;
            const current_viewers = streamingJSON.data[0].viewer_count.toString();
            const pfp = nstreamingJSON.data[0].profile_image_url;
            const link = `https://www.twitch.tv/${username}`

            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(game_name)
                .setAuthor({name: username, iconURL: pfp})
                .setColor(48,0,242)
                .setURL(link)
                .setFields(
                    { name: "Viewer Count", value: current_viewers},
                )

            await interaction.reply({ embeds : [embed], fetchReply : true})
        }
        
    }
}