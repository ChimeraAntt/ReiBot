const { SlashCommandBuilder, Guild, GuildMember, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('displays info on a user')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Who do you want to check?')
            .setRequired(true)),

    async execute(interaction){
        // Fetch the supplied user's uid
        const user = await interaction.options.getUser('user').fetch()
        const uid = user.id
        const guildMember = await interaction.guild.members.fetch(`${uid}`)

        // Collect users display and username
        const username = user.username
        const displayName = user.displayName

        // Collect user's server and discord avatar
        const discordAvatar = await user.avatarURL(
            {
                'extension': 'png',
                'dynamic': true,
                'size': 2048
            }
        )

        const serverAvatar = await guildMember.avatarURL(
            {
                'extension': 'png',
                'dynamic': true,
                'size': 2048
            }
        )
        
        // Check if user is a bot
        const isBot = user.bot

        // Some other info
        const roles = guildMember.roles
        const color = roles.highest.hexColor
        const joinDate = Math.round(guildMember.joinedTimestamp /1000 )
        const creationDate =Math.round(user.createdTimestamp /1000 )

        // Create and send user info embed
        const embed = new EmbedBuilder()
            .setAuthor({name: `Info about ${username}!`, iconURL: discordAvatar})
            .setTitle(`${displayName}`)
            .setThumbnail((serverAvatar != null) ? serverAvatar : discordAvatar) 
            .setFooter({text: `UID: ${uid}`})
            .setColor(color)
            .setFields(
                {name: 'Server Join Date', value: `<t:${joinDate}:F>`},
                {name: 'Account Created', value: `<t:${creationDate}:F>`},
                {name: 'User\'s top role', value: `${roles.highest.name}`},
                {name: 'Bot?', value: (isBot ? "Yes" : "Nope")},
            )
        await interaction.reply({ embeds : [embed], fetchReply : true})
    },
};