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
        const user = await interaction.options.getUser('user').fetch()
        const uid = user.id
        const guildMember = await interaction.guild.members.fetch(`${uid}`)

        const username = user.username
        const displayName = user.displayName

        const discordAvatar = await user.avatarURL(
            {
                'extension': 'png',
                'dynamic': true,
                'size': 2048
            }
        )
        const isBot = user.bot

        const roles = guildMember.roles
        const color = roles.highest.hexColor
        const serverAvatar = await guildMember.avatarURL(
            {
                'extension': 'png',
                'dynamic': true,
                'size': 2048
            }
        )
        
        const joinDate = Math.round(guildMember.joinedTimestamp /1000 )
        const creationDate =Math.round(user.createdTimestamp /1000 )

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