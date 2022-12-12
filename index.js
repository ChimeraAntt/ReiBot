require('dotenv').config();
const { GatewayIntentBits } = require('discord.js');
const Discord = require('discord.js');
const { token } = require('./config.json')

const client = new Discord.Client({intents: [GatewayIntentBits.Guilds]});

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}...');
});

client.login(token);