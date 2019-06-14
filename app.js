const fs = require('fs');
const Discord = require ("discord.js")
const client = new Discord.Client();
const { colour } = require ("./colours.json");
const { rcolour } = require ("./colours.json");
const YouTube = require('simple-youtube-api');
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

client.on('message', async (msg, play) => {
	
  let settings;
  try {
      settings = await client.getGuild(msg.guild);
  } catch (error) {
      console.error(error);
  }
  
  const PREFIX = settings.prefix
	
	const pembed = new Discord.RichEmbed()
	.setColor(colour)
	.setDescription(`❯ Please use \`${PREFIX}help\` if you need any help!`)
	
	if (msg.content === `<@552909188901240844>`) return msg.channel.send(pembed)
	
	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)
	
	if (!msg.content.startsWith(PREFIX)) return;
	const args = msg.content.split(' ');

  if (msg.author.bot) return undefined;

	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
        	
		if (!voiceChannel) return msg.channel.send('Please join a voice channel to use music command!');
        
    const permissions = voiceChannel.permissionsFor(msg.client.user);
        
    if (!permissions.has('CONNECT')) {
		  return msg.channel.send("I don't have enough permissions to join your voice channel!");
    }
        
		if (!permissions.has('SPEAK')) {
			return msg.channel.send("I don't have enough permissions to speak in your voice channel!");
		}

		if (!permissions.has('EMBED_LINKS')) {
			return msg.channel.send("I don't have enough permissions to insert a URL!")
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

			const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
            
			for (const video of Object.values(videos)) {      
        const video2 = await youtube.getVideoByID(video.id); 
        await handleVideo(video2, msg, voiceChannel, true); 
      }

			return msg.channel.send(`Successfully added ${song.title} to the queue!`);
		} else {

			try {

        var video = await youtube.getVideo(url);
                
			} catch (error) {
				try {

					var videos = await youtube.searchVideos(searchString, 5);
					let index = 0;
          const embed1 = new Discord.RichEmbed()
          .setTitle("❯ :mag_right:  YouTube Search Results :")
          .setDescription(`${videos.map(video2 => `${++index}. **${video2.title}**`).join('\n')}`)          
					.setColor(colour)
					msg.channel.send(embed1).then(message =>{message.delete(20000)})
								
					try {

						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 15000,
							errors: ['time']
						});
          
          } catch (err) {												
						return
          }    
          
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    
				} catch (err) {

					return msg.channel.send("❯ I didn't find any results! `❌`");
				}
			}

            return handleVideo(video, msg, voiceChannel);
            
        }
        
	} else if (command === `skip`) {
	
		if (!msg.member.voiceChannel) return msg.channel.send('Please join a voice channel to use music command!');
				
		if (!serverQueue) return msg.channel.send('The queue is empty!');
		
		serverQueue.connection.dispatcher.end('Successfully skipped!');
    return undefined;
        
	} else if (command === `stop`) {

    if (!msg.member.voiceChannel) return msg.channel.send('Please join a voice channel to use music command!');
    if (!serverQueue) return msg.channel.send('The queue is empty!');
           
    serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Successfully stopped!');
		
		msg.channel.send('Successfully stopped!')
		return undefined;
        
	} else if (command === `vol`) {
			
		if (!msg.member.voiceChannel) return msg.channel.send('Please join a voice channel to use music command!');
				
		if (!serverQueue) return msg.channel.send('You can only use this command when music is playing!');
		
		if (!args[1]) return msg.channel.send("Current volume: `" + serverQueue.volume + "`");
		
		serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);

    return msg.channel.send("Successfully set volume to `" + args[1] + "`!");

	} else if (command === `np`) {

		if (!serverQueue) return msg.channel.send('The queue is empty!');

		return msg.channel.sendEmbed(`Now playing: ${serverQueue.songs[0].title}!`);
        
	} else if (command === `queue`) {
			
		if (!serverQueue) return msg.channel.send('The queue is empty!');
		let index = 0;

		const embedqu = new Discord.RichEmbed()
		.setColor(colour)		
		.setTitle("❯ The Queue Songs :")
    .setDescription(`${serverQueue.songs.map(song => `${++index}. **${song.title}**`).join('\n')} \n**Now playing :** **${serverQueue.songs[0].title}**`)
    .setColor("#f7abab")
		return msg.channel.sendEmbed(embedqu);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('Successfully paused!');
		}
		return msg.channel.send('The queue is empty!');
	} else if (command === "resume") {

		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
						
			return msg.channel.send('Successfully resumed!');
            
		}
				
		return msg.channel.send('The queue is empty!');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {  // <-- More Music Stuff 
	const serverQueue = queue.get(msg.guild.id);
	
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {

			queue.delete(msg.guild.id);
			return msg.channel.send("I can't join your channel!");
		}
	} else {
		serverQueue.songs.push(song);

		if (playlist) return undefined;
		else return msg.channel.send(`Successfully added ${song.title} to the queue!`);
	} 
	return undefined;
}

function play(guild, song) {                                      // <-- More Music Stuff XD (Play Command)
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

	serverQueue.textChannel.send(`Now playing: ${song.title}!`);
};

client.mongoose.init();
client.login(process.env.CLIENT_TOKEN);