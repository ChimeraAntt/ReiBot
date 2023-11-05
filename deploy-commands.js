// Import important things
const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('node:fs');
const { guildId } = "";

// Collect command files
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const apiCommandFiles = fs.readdirSync('./apicommands').filter(file => file.endsWith('.js'));

// Push command data into json
for (const file of commandFiles){
    const command = require('./commands/' + file);
    commands.push(command.data.toJSON());
}
for (const file of apiCommandFiles){
    const command = require('./apicommands/' + file);
    commands.push(command.data.toJSON());
}

// Initialize rest with token in order to add commands to the bot
const rest = new REST({ version: '10' }).setToken(token);

// Refresh commands
(async () => {
    try{
        console.log('Started refreshing ' + commands.length + ' application (/) commands...');

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        )

        console.log('Successfully reloaded ' + data.length + ' application (/) commands.');
    } catch(error){
        console.log(error);
    }
})();
