const fs = require('fs');
const Discord = require ("discord.js")
const client = new Discord.Client();
const { colour } = require ("./colours.json");

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

const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const ytdl = require('ytdl-core');
const Util = require("discord.js");


client.on('message', async (message, play) => {
	let settings;
	try {
		settings = await client.getGuild(message.guild);
	} catch (error) {
		console.error(error);
	}
	const prefix = settings.prefix
	if (message.content === `<@588004390162661401>`) return message.channel.send(`If you need help, execute !help.`)
	let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length);
	if (!message.content.startsWith(prefix)) return;
	const args = message.content.split(' ');
	if (message.author.bot) return undefined;
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);

	if (command === `play`) {
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send("You're not in a voice channel.");
		const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) {
			return message.channel.send("I can't join your voice channel.");
        }
		if (!permissions.has('SPEAK')) {
			return message.channel.send("I can't speak in your voice channel.");
		}
		if (!permissions.has('EMBED_LINKS')) {
			return message.channel.sendMessage("I can't insert a URL in your voice channel.")
		}
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
      		const videos = await playlist.getVideos();  
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); 
				await handleVideo(video2, message, voiceChannel, true); 	
			}      
			return message.channel.send(`Successfully added ${song.title} to queue.`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 5);
					let index = 0;
					const resultsembed = new Discord.RichEmbed()
					.setColor(colour)
					.setTitle("__**YouTube Search Results**__")
					.setDescription(`${videos.map(video2 => `${++index}. **${video2.title}**`).join('\n')}`)
					message.channel.send(resultsembed);
					try {
						var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 20000,
							errors: ['time']
						});
					} catch (err) {
						let NoNumberEmbed = new Discord.RichEmbed()
						.setColor(colour)
						.setDescription("❯ Times Up ⏰")

						return msg.channel.send(NoNumberEmbed);
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					message.channel.send("No results.")
				}
			}
		
			return handleVideo(video, message, voiceChannel);
		
		}
	
	} else if (command === `skip`)	{
		if (!message.member.voiceChannel) return message.channel.send("You're not in a voice channel.");	
		if (!serverQueue) return message.channel.send('The queue is empty.');
		serverQueue.connection.dispatcher.end('Successfully skipped.');
    	return undefined;
	
	} else if (command === `stop`) {
		if (!message.member.voiceChannel) return message.channel.send("You're not in a voice channel.");
		if (!serverQueue) return message.channel.send('The queue is empty.');	   
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Successfully stopped.');	
		message.channel.send('Successfully stopped.')
		return undefined;		
	
	} else if (command === `vol`) {
		if (!message.member.voiceChannel) return message.channel.send("You're not in a voice channel.");	
		if (!serverQueue) return message.channel.send("There is no music playing.");
		if (!args[1]) return message.channel.send("Current volume: " + serverQueue.volume);
		serverQueue.volume = args[1];
    	serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
    	return message.channel.send("Successfully set volume to:" + args[1]);		
	
	} else if (command === `np`) {
		if (!serverQueue) return message.channel.send('The queue is empty.');
		return message.channel.send(`Current song: ${serverQueue.songs[0].title}`);
        
	} else if (command === `queue`) {	
		if (!serverQueue) return message.channel.send('The queue is empty.');
		let index = 0;
		const queueembed = new Discord.RichEmbed()
		.setColor(colour)		
		.setTitle("__**Queue**__:")
    	.setDescription(`${serverQueue.songs.map(song => `${++index}. **${song.title}**`).join('\n')} \n**Current Song:** **${serverQueue.songs[0].title}**`)
    	.setColor(colour)
		return message.channel.send(queueembed);
	
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('Successfully paused.');
		}
		return message.channel.send('The queue is empty.');
	
	} else if (command === "resume") {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();			
			return message.channel.send('Successfully resumed.');
		}
		return message.channel.send('The queue is empty.');
	}

	return undefined;

});

async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = queue.get(message.guild.id);
	
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {

			queue.delete(message.guild.id);
			return message.channel.send("I can't join your channel.");
		}
	} else {
		serverQueue.songs.push(song);

		if (playlist) return undefined;
		else return message.channel.send(`Successfully added ${song.title} to the queue.`);
	} 
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
			.on('end', reason => {
					if (reason === 'Stream is not generating quickly enough');
					serverQueue.songs.shift();
					play(guild, serverQueue.songs[0]);
			})
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`Current song: ${song.title}`);
};

client.mongoose.init();
client.login(process.env.CLIENT_TOKEN);