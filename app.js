const fs = require('fs');
const Discord = require ("discord.js")
const client = new Discord.Client();
const active = new Map();

require('dotenv-flow').config();
require('./utils/functions')(client);

client.commands = new Discord.Collection();
client.mongoose = require('./utils/mongoose');
client.config = require('./config');

fs.readdir('./events/', (err, files) => {
  if (err) return console.error;
  console.log(`Loaded all Events!`)
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    client.on(evtName, evt.bind(null, client));
  });
});

client.on('message', async (message) => {
	
	let settings;
	try {
		settings = await client.getGuild(message.guild);
	} catch (error) {
		console.error(error);
	}

	let prefix = settings.prefix;
	let args = message.content.slice(prefix.length).trim().split(' ');
	let cmd = args.shift().toLowerCase();

	if(message.author.bot) return;
	if(!message.content.startsWith(prefix)) return;
	
	try {
		let ops = {
			active: active
		}
	
		let commandFile = rquire(`./commands/${cmd}.js`);
		commandFile.run(client, message, args, ops);
	} catch (e) {
		console.log(e);
	}

})

client.mongoose.init();
client.login(process.env.CLIENT_TOKEN);