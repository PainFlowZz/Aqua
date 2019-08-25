const fs = require('fs');
const Discord = require ("discord.js")
const MusicClient = require('./struct/Client');
const client = new MusicClient({ token: process.env.DISCORD_TOKEN });
const { colour } = require ("./colours.json");
const { rcolour } = require ("./colours.json");
const YouTube = require('simple-youtube-api');
const { readdirSync } = require('fs');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const ytdl = require('ytdl-core');
const Util = require("discord.js");

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

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));
	client.commands.set(command.name, command);
}

client.mongoose.init();
client.login(process.env.CLIENT_TOKEN);