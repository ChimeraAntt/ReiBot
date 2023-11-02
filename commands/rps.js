const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rps")
        .setDescription("Rock Paper Scizzors")
        .addStringOption((option) => option
			.setName('rps')
			.setDescription('Choose')
            .setRequired(true)
			.addChoices({ name: 'Rock', value: 'rock' }, { name: 'Paper', value: 'paper' }, { name: 'Scizzors', value: 'scizzors'})),    
    async execute(interaction){
        const userOption = interaction.options.getString("rps");
        const botOptions = ["rock", "paper", "scizzors"];
        const botChoice = botOptions[Math.floor(Math.random()*botOptions.length)];
        console.log(botChoice);
        console.log(userOption);



        if(userOption == 'rock'){
            if(botChoice == 'rock'){
                await interaction.reply("Rock ties with Rock");
            }else if(botChoice == 'paper'){
                await interaction.reply("Rock loses to Paper L");
            }else if(botChoice == 'scizzors'){
                await interaction.reply("Rock beats Scizzors! W");
            }
        }else if(userOption == 'paper'){
            if(botChoice == 'rock'){
                await interaction.reply("Paper beats Rock! :)");
            }else if(botChoice == 'paper'){
                await interaction.reply("Paper ties with Paper");
            }else if(botChoice == 'scizzors'){
                await interaction.reply("Paper loses to Scizzors :(");
            }
        }else if(userOption == 'scizzors'){
            if(botChoice == 'rock'){
                await interaction.reply("Scizzors loses to Rock...")
            }else if(botChoice == 'paper'){
                await interaction.reply("Scizzors Beats Paper!!!")
            }else if(botChoice == 'scizzors'){
                await interaction.reply("Scizzors ties with Scizzors???")
            }
        }else{
            await interaction.reply({content: "This is not an option",ephemeral: true});
        }
    },
};