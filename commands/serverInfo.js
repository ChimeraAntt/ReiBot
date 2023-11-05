const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// TODO remake this!!!
module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('displays info on the server'),
    async execute(interaction){
        //Get guild name
        const guild = interaction.guild
        const guildName = guild.name

        const icon = guild.iconURL({
            'extension': 'png',
            'dynamic': true,
            'size': 2048
        })

        const createdAt = Math.round(guild.createdTimestamp /1000 )
        const memberCount = guild.memberCount
        const owner = await guild.fetchOwner()
        const ownerName = owner.displayName
        
        const isPartnered = guild.partnered
        const premiumTier = guild.premiumTier
        
        //TODO make embed
        const embed = new EmbedBuilder()
        .setAuthor({name: `Info about ${guildName}!`, iconURL: icon})
        .setTitle(`${guildName}`)
        .setThumbnail(icon)
        .setFields(
            {name: 'Server Created', value: `<t:${createdAt}:F>`},
            {name: 'Member count', value: `${memberCount}`},
            {name: 'Owner', value: ownerName},
            {name: "Partnered Server?", value: (isPartnered ? "Yes" : "No")},
            {name: 'Premium Tier', value: `${premiumTier}`}
        )
        await interaction.reply({ embeds : [embed], fetchReply : true});

    },
};