// Import important things
const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');
const  { token } = require('./config.json');
const { spawn } = require('child_process');

// Initialize the client
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

// Deploy commands
deployCommands = spawn('node', ['deploy-commands.js'], {
	cwd: __dirname,
	stdio: 'inherit',
});

// Find all the command files
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const apiCommandsPath = path.join(__dirname,'apicommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const apiCommandFiles = fs.readdirSync(apiCommandsPath).filter(file => file.endsWith('.js'));

// Initialize the commands
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}
for (const file of apiCommandFiles) {
	const filePath = path.join(apiCommandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Collect event files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Initialize and prepare events
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Stuff to do when the bot starts
client.once(Events.ClientReady, () => {
	console.log('Robot Activate!');
});

// Start client
client.login(token);
