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
        
		const YoureNotInAVoiceChannelEmbed = new Discord.RichEmbed()
		.setColor(rcolour)
		.setDescription("❯ You're not in a Voice Channel `❌`")
		
		if (!voiceChannel) return msg.channel.send(YoureNotInAVoiceChannelEmbed);
        
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        
        if (!permissions.has('CONNECT')) {

			return msg.channel.send("❯ I don't have enough permissions to join your voice channel! `❌`");
        }
        
		if (!permissions.has('SPEAK')) {

			return msg.channel.send("❯ I don't have enough permissions to speak in your voice channel! `❌`");
		}

		if (!permissions.has('EMBED_LINKS')) {

			return msg.channel.sendMessage("❯ I don't have enough permissions to insert a URLs! `❌`")
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

			const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            
			for (const video of Object.values(videos)) {
                
                const video2 = await youtube.getVideoByID(video.id); 
                await handleVideo(video2, msg, voiceChannel, true); 
            }
			
			const justaddedtoqueueemebed = new Discord.RichEmbed()
			.setColor(colour)
			.setDescription("❯ I added **"+song.title+"** to the queue `✔️`")
			
			return msg.channel.send(justaddedtoqueueemebed);
		} else {

			try {

                var video = await youtube.getVideo(url);
                
			} catch (error) {
				try {

					var videos = await youtube.searchVideos(searchString, 5);
					let index = 0;
                    const embed1 = new Discord.RichEmbed()
                    .setTitle("❯ :mag_right:  YouTube Search Results :")
                    .setDescription(`
                    ${videos.map(video2 => `${++index}. **${video2.title}**`).join('\n')}`)
                    
					.setColor(colour)
					msg.channel.send(embed1).then(message =>{message.delete(20000)})
								
					try {

						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 15000,
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

					return msg.channel.send("❯ I didn't find any results! `❌`");
				}
			}

            return handleVideo(video, msg, voiceChannel);
            
        }
        
	} else if (command === `skip`) {

		const YoureNotInAVoiceChannelEmbed = new Discord.RichEmbed()
		.setColor(rcolour)
		.setDescription("❯ You're not in a Voice Channel `❌`")
		
		if (!msg.member.voiceChannel) return msg.channel.send(YoureNotInAVoiceChannelEmbed);
		
		const noqueueemebed = new Discord.RichEmbed()
		.setColor(rcolour)
		.setDescription("❯ There is no Queue `❌`")
		
		if (!serverQueue) return msg.channel.send(noqueueemebed);

		const Skippedembed = new Discord.RichEmbed()
		.setColor(colour)
		.setDescription("❯ Skipped `✔️`")
		
		serverQueue.connection.dispatcher.end(Skippedembed);
        return undefined;
        
	} else if (command === `stop`) {
		const noquseueemebed = new Discord.RichEmbed()
		.setColor(rcolour)
		.setDescription("❯ There is no Queue to stop!`❌`")
    const noquseueemsebed = new Discord.RichEmbed()
		.setColor(rcolour)
		.setDescription("❯ You're not in a Voice Channel `❌`")
    if (!msg.member.voiceChannel) return msg.channel.send(noquseueemsebed);
    if (!serverQueue) return msg.channel.send(noquseueemebed);
        
		const Stopembed = new Discord.RichEmbed()
		.setColor(colour)
		.setDescription("❯ Stopped `✔️`")
    
    serverQueue.songs = [];
		serverQueue.connection.dispatcher.end(Stopembed);
		
		msg.channel.send(Stopembed)
		return undefined;
        
	} else if (command === `vol`) {
		
		const MissingPermissionEmbed = new Discord.RichEmbed()
		.setColor(rcolour)
		.setDescription("❯ Missing permission : `ADMINISTRATOR` `❌`")	

		if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(MissingPermissionEmbed)
		
		const YoureNotInAVoiceChannelEmbed = new Discord.RichEmbed()
		.setColor(rcolour)
		.setDescription("❯ You're not in a Voice Channel `❌`")
		
		if (!msg.member.voiceChannel) return msg.channel.send(YoureNotInAVoiceChannelEmbed);
		
		const NoMusicPlaying = new Discord.RichEmbed()
		.setColor(rcolour)
		.setDescription("❯ You only can use this command while music is playing `❌`")
		
		if (!serverQueue) return msg.channel.send(NoMusicPlaying);
		
		const CurrentVolume = new Discord.RichEmbed()
		.setColor(colour)
		.setDescription(`❯ The bot volume is **${serverQueue.volume}**`)

		if (!args[1]) return msg.channel.send(CurrentVolume);
		
		serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
		
		const VolumeEmbed = new Discord.RichEmbed()
		.setColor(colour)
		.setDescription(`❯ Volume Now is **${args[1]}** \`✔️\``)

    return msg.channel.send(VolumeEmbed);

	} else if (command === `np`) {

		const noqueueemebed = new Discord.RichEmbed()
		.setColor(rcolour)
		.setDescription("❯ There is no Queue `❌`")

		if (!serverQueue) return msg.channel.send(noqueueemebed);
		const embedNP = new Discord.RichEmbed()
		.setColor(colour)
		.setDescription(`❯ Now playing **${serverQueue.songs[0].title} \`✔️\`**`)
		
		return msg.channel.sendEmbed(embedNP);
        
	} else if (command === `queue`) {
		
		const noqueueemebed = new Discord.RichEmbed()
		.setColor(rcolour)
		.setDescription("❯ There is no Queue `❌`")
		
		if (!serverQueue) return msg.channel.send(noqueueemebed);
		let index = 0;

		const embedqu = new Discord.RichEmbed()
		.setColor(colour)		
		.setTitle("❯ The Queue Songs :")
    .setDescription(`
        ${serverQueue.songs.map(song => `${++index}. **${song.title}**`).join('\n')}
**Now playing :** **${serverQueue.songs[0].title}**`)
        .setColor("#f7abab")
		return msg.channel.sendEmbed(embedqu);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('Ok, paused');
		}
		return msg.channel.send('❯ There is no Queue to Pause `❌`');
	} else if (command === "resume") {

		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			
			const ResumedEmbed = new Discord.RichEmbed()
			.setColor(colour)
			.setDescription("❯ Resumed ▶️")
			
			return msg.channel.send(ResumedEmbed);
            
		}
		
		const queueisemptyembed = new Discord.RichEmbed()
		.setColor(rcolour)
		.setDescription('❯ Queue is empty! `❌`')
		
		return msg.channel.send(queueisemptyembed);
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
			return msg.channel.send("❯ I can't join your channel:"+error+"` ❌`");
		}
	} else {
		serverQueue.songs.push(song);

		const justaddedtoqueueemebed = new Discord.RichEmbed()
		.setColor(colour)
		.setDescription("❯ I added **"+song.title+"** to the queue `✔️`")

		if (playlist) return undefined;
		else return msg.channel.send(justaddedtoqueueemebed);
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

	const songisnowplayingembed = new Discord.RichEmbed()
	.setColor(colour)
	.setDescription(`❯ **${song.title}**, is now playing \`✔️\``)

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
			.on('end', reason => {
					if (reason === 'Stream is not generating quickly enough');
					serverQueue.songs.shift();
					play(guild, serverQueue.songs[0]);
			})
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(songisnowplayingembed);
};

client.mongoose.init();
client.login(process.env.CLIENT_TOKEN);