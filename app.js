const fs = require('fs');
const Discord = require ("discord.js")
const MusicClient = require('./struct/Client');
const client = new MusicClient({ token: process.env.DISCORD_TOKEN });
const { readdirSync } = require('fs');
const { join } = require('path');

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

fs.readdir('./commands/', async (err, files) => {
	if (err) return console.error;
	console.log(`Loaded all Commands!`)
	  
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/${file}`);
		let cmdName = file.split('.')[0];
		client.commands.set(cmdName, props);
	});
});

client.mongoose.init();
client.login(process.env.CLIENT_TOKEN);