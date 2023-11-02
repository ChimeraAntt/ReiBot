const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { execute } = require("./ping");
//const { ActionRowBuilder, StringSelectMenuBuilder, InteractionResponse} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays a help menu')
    .addStringOption((option) => option
        .setName('choice')
        .setDescription('Choose which help menu you would like to see!')
        .setRequired(true)
        .addChoices(
            { name: 'Basic Commands!', value: 'basic'},
            { name: 'Fun Commands!', value: 'fun'},
            { name: 'Tetr.io Commands!', value: 'tetrio'},
            { name: 'Admin Commands!', value: 'admin'},
        )),
    async execute(interaction){
        const choice = interaction.options.getString('choice');
        //Embeds
        const basic_embed = new EmbedBuilder() //Basic Commands
            .setTitle("Basic Commands!")
            .setDescription("These are the basic commands!")
            .setAuthor({name: "Rei Help Menu", iconURL: 'https://imgur.com/a/T5fCDce'})
            .setColor(48,0,242)
            .setFields(
                { name: "/ping", value: "Responds with \"Pong\"!"},
                { name: "/serverinfo", value: "Displays The Server name, and members! (Soon to be Updated)"},
                { name: "/userinfo", value: "Shows some info about the person running the command! (Soon to be Updated)"}
            );
        const fun_embed = new EmbedBuilder() //Fun Commands
            .setTitle("Fun Commands!")
            .setDescription("These are some fun commands!")
            .setAuthor({name: "Rei Help Menu", iconURL: 'https://imgur.com/a/T5fCDce'})
            .setColor(48,0,242)
            .setFields(
                { name: "/check_stream", value: "Checks if a specific person is streaming on twitch.tv!"},
                { name: "/getavatar", value: "Gets the profile picture from a specific user!"},
                { name: "/poll", value: "Allows you to create a simple poll!"},
                { name: "/rps", value: "Play Rock Paper Scizzors against the bot!"},
                { name: "/bored", value: "Get a suggestion for when your bored!"},
                { name: "/affirmation", value: "Get a positive daily affirmation!"},
                { name: "/apod", value: "Astronomy Picture of the day!"},
                );
        const tetrio_embed = new EmbedBuilder() //Tetr.io Commands
            .setTitle("Tetr.io Commands!")
            .setDescription("These are some commands that let you see tetr.io stats!")
            .setAuthor({name: "Rei Help Menu", iconURL: 'https://imgur.com/a/T5fCDce'})
            .setColor(48,0,242)
            .setFields(
                { name: "/tetrio_register", value: "Use this command to get added to the bot's tetr.io database!"},
                { name: "/tetrio_user", value: "Lets you see lots of info about a specific tetrio user!"},
                );
        const admin_embed = new EmbedBuilder() //Admin Commands
            .setTitle("Admin Commands!")
            .setDescription("These are some Admin commands!")
            .setAuthor({name: "Rei Help Menu", iconURL: 'https://imgur.com/a/T5fCDce'})
            .setColor(48,0,242)
            .setFields(
                { name: "/add_status", value: "Allows an admin to create a status for the Bot!"},
                { name: "/steal", value: "Allows admins to get an image or gif for a given emoji!"},
                );
        switch(choice) {
            case 'basic':
                await interaction.reply({embeds: [basic_embed], ephemeral: true});
                break;
            case 'fun':
                await interaction.reply({embeds: [fun_embed], ephemeral: true});
                break;
            case 'tetrio':
                await interaction.reply({embeds: [tetrio_embed], ephemeral: true});
                break;
            case 'admin':
                await interaction.reply({embeds: [admin_embed], ephemeral: true});
                break;
            default:
                await interaction.reply("Sorry, There was an error...")
        }
    }
}




// FIXME
// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('help')
//         .setDescription('Displays a help menu'),
//     async execute(interaction){
//         //Rows
//         const row = new ActionRowBuilder()
//             .addComponents(
//                 new StringSelectMenuBuilder()
//                     .setCustomId('select')
//                     .setPlaceholder('Please select an option!')
//                     .addOptions(
//                         {
//                             label: 'Basic Commands',
//                             description: 'The Basic Commands!',
//                             value: 'basic',
//                         },
//                         {
//                             label: 'Fun Commands',
//                             description: 'Fun commands to play around with!',
//                             value: 'fun',
//                         },
//                         {
//                             label: 'Tetr.io Commands',
//                             description: 'Commands for your tetr.io stats!',
//                             value: 'tetrio',
//                         },
//                         {
//                             label: 'Admin Commands',
//                             description:'Commands for Administrators!',
//                             value: 'admin',
//                         }
//                     )
//             );
//         //Embeds
//         const main_embed = new EmbedBuilder() //Main Embed
//             .setTitle("Help Menu!") 
//             .setDescription("Refer to this menu whenerver you require help!")
//             .setAuthor({name: "Rei Help Menu", iconURL: 'https://imgur.com/a/T5fCDce'})
//             .setColor(48,0,242);
//         const basic_embed = new EmbedBuilder() //Basic Commands
//             .setTitle("Basic Commands!")
//             .setDescription("These are the basic commands!")
//             .setAuthor({name: "Rei Help Menu", iconURL: 'https://imgur.com/a/T5fCDce'})
//             .setColor(48,0,242)
//             .setFields(
//                 { name: "/ping", value: "Responds with \"Pong\"!"},
//                 { name: "/serverinfo", value: "Displays The Server name, and members! (Soon to be Updated)"},
//                 { name: "/userinfo", value: "Shows some info about the person running the command! (Soon to be Updated)"}
//             );
//         const fun_embed = new EmbedBuilder() //Fun Commands
//             .setTitle("Fun Commands!")
//             .setDescription("These are some fun commands!")
//             .setAuthor({name: "Rei Help Menu", iconURL: 'https://imgur.com/a/T5fCDce'})
//             .setColor(48,0,242)
//             .setFields(
//                 { name: "/check_stream", value: "Checks if a specific person is streaming on twitch.tv!"},
//                 { name: "/getavatar", value: "Gets the profile picture from a specific user!"},
//                 { name: "/poll", value: "Allows you to create a simple poll!"},
//                 { name: "/rps", value: "Play Rock Paper Scizzors against the bot!"},
//                 );
//         const tetrio_embed = new EmbedBuilder() //Fun Commands
//             .setTitle("Tetr.io Commands!")
//             .setDescription("These are some commands that let you see tetr.io stats!")
//             .setAuthor({name: "Rei Help Menu", iconURL: 'https://imgur.com/a/T5fCDce'})
//             .setColor(48,0,242)
//             .setFields(
//                 { name: "/tetrio_register", value: "Use this command to get added to the bot's tetr.io database!"},
//                 { name: "/tetrio_user", value: "Lets you see lots of info about a specific tetrio user!"},
//                 );
//         const admin_embed = new EmbedBuilder() //Fun Commands
//             .setTitle("Admin Commands!")
//             .setDescription("These are some Admin commands!")
//             .setAuthor({name: "Rei Help Menu", iconURL: 'https://imgur.com/a/T5fCDce'})
//             .setColor(48,0,242)
//             .setFields(
//                 { name: "/add_status", value: "Allows an admin to create a status for the Bot!"},
//                 { name: "/steal", value: "Allows admins to get an image or gif for a given emoji!"},
//                 );
//         await interaction.reply({embeds: [main_embed], components: [row]});
//         if(interaction.customId = 'basic') {
//             await interaction.followUp({embeds: [basic_embed], ephemeral: true});
//         }else if(interaction.customId = 'fun') {
//             await interaction.followUp({embeds: [fun_embed], ephemeral: true});
//         }else if(interaction.customId = 'tetrio') {
//             await interaction.followUp({embeds: [tetrio_embed], ephemeral: true});
//         }else if(interaction.customId = 'admin') {
//             await interaction.followUp({embeds: [admin_embed], ephemeral: true});
//         }

        
            
//     },
// };
