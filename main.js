const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const algosdk = require('algosdk');
require('dotenv').config({path: 'CONFIG.env'});

let algoClient = new algosdk.Algodv2({'X-Api-key': process.env.API_KEY}, process.env.ENDPOINT, process.env.ENDPOINT_PORT)
let indexerClient = new algosdk.Indexer({'X-Api-key' : process.env.API_KEY}, process.env.INDEXER_ENDPOINT, process.env.INDEXER_PORT)
prefix = process.env.DISCORD_BOT_PREFIX

client.commands = new Discord.Collection();

//Stolen from discord.js docs
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
//

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
	//Ignore bot messages and messages not starting with our command prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;

		//Get the arguments of the command using regex
  	const args = message.content.slice(prefix.length).trim().split(/ +/);
  	const command = args.shift().toLowerCase();

    try {
			//Check if we have that command and execute it
  		client.commands.get(command).execute(message, args, algosdk, algoClient, indexerClient, client.commands);
    }
	  catch (error) {
  		console.error(error);
  		message.reply('That command doesn\'t exist');
	  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
