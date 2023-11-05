const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rps")
        .setDescription("Rock Paper Scissors")
        .addStringOption((option) => option
			.setName('rps')
			.setDescription('Choose')
            .setRequired(true)
			.addChoices({ name: 'Rock', value: 'rock' }, { name: 'Paper', value: 'paper' }, { name: 'Scissors', value: 'scissors'})),    
    async execute(interaction){
        // Grab the users choice, then randomly generate bot's choice
        const userOption = interaction.options.getString("rps");
        const botOptions = ["rock", "paper", "scissors"];
        const botChoice = botOptions[Math.floor(Math.random()*botOptions.length)];

        // Play Rock, Paper, Scissors
        if(userOption == 'rock'){
            if(botChoice == 'rock'){
                await interaction.reply("Rock ties with Rock");
            }else if(botChoice == 'paper'){
                await interaction.reply("Rock loses to Paper L");
            }else if(botChoice == 'scissors'){
                await interaction.reply("Rock beats Scissors! W");
            }
        }else if(userOption == 'paper'){
            if(botChoice == 'rock'){
                await interaction.reply("Paper beats Rock! :)");
            }else if(botChoice == 'paper'){
                await interaction.reply("Paper ties with Paper");
            }else if(botChoice == 'scissors'){
                await interaction.reply("Paper loses to Scissors :(");
            }
        }else if(userOption == 'scissors'){
            if(botChoice == 'rock'){
                await interaction.reply("Scissors loses to Rock...")
            }else if(botChoice == 'paper'){
                await interaction.reply("Scissors Beats Paper!!!")
            }else if(botChoice == 'scissors'){
                await interaction.reply("Scissors ties with Scissors???")
            }
        }else{
            await interaction.reply({content: "This is not an option",ephemeral: true});
        }
    },
};