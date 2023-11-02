const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

function getRandomLine(filename){
	const data = fs.readFileSync(filename, "utf8");
	const lines = data.split('\n');
	return lines[Math.floor(Math.random()*lines.length)]
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const apiCommandsPath = path.join(__dirname,'apicommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const apiCommandFiles = fs.readdirSync(apiCommandsPath).filter(file => file.endsWith('.js'));

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
 
client.once(Events.ClientReady, () => {
	console.log('Robot Activate!');
	const statusOptions = ["watching", "playing", "listening", "competing", "streaming"];
	client.user.setPresence({
		activities: [{ name: "Charging", type: ActivityType.Playing }],
		status: 'active',
	  });
	let announced = false;
	setInterval(async function(){
		const statusChoice = statusOptions[Math.floor(Math.random()*statusOptions.length)]
		//console.log(statusChoice);
		if(statusChoice === "watching"){
			const s = getRandomLine('status_files/watching.txt');
			//console.log(s);
			client.user.setPresence({
				activities: [{ name: s, type: ActivityType.Watching }],
				status: 'active',
			  });
		}else if(statusChoice === "playing"){
			const s = getRandomLine('status_files/playing.txt');
			//console.log(s);
			client.user.setPresence({
				activities: [{ name: s, type: ActivityType.Playing }],
				status: 'active',
			  });
		}else if(statusChoice === "listening"){
			const s = getRandomLine('status_files/listening.txt');
			//console.log(s);
			client.user.setPresence({
				activities: [{ name: s, type: ActivityType.Listening }],
				status: 'active',
			  });
		}else if(statusChoice === "competing"){
			const s = getRandomLine('status_files/competing.txt');
			//console.log(s);
			const place = Math.floor(Math.random() * 10) + 1; 
			if(place == 1){
				suffix = 'st';
			}else if(place == 2){
				suffix = 'nd';
			}else if(place == 3){
				suffix = 'rd';
			}else{
				suffix = 'th';
			}
			client.user.setPresence({
				activities: [{ name: s + `(` + place + suffix + ` place)`, type: ActivityType.Competing }],
				status: 'active',
			  });
		}else if(statusChoice === "streaming"){
			const s = getRandomLine('status_files/streaming.txt');
			//console.log(s);
			client.user.setPresence({
				activities: [{ name: s, type: ActivityType.Streaming }],
				status: 'active',
			  });
		}else{
			client.user.setPresence({ activities: [{ name: 'In Your Walls' }], status: 'active' })
		}
		//}

		
	}, (25 * 1000))
    //60 * (Math.floor(Math.random() * 5) + 1)
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);
