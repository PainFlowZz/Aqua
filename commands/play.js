const ytdl = require('ytdl-core');
 
exports.run = async (client, message, args, ops) => {
 
    if (!message.member.voiceChannel) return message.channel.send("You're not in a voice channel.");
 
    if (!args[0]) return message.channel.send("Please provide a url/searchterm.");
 
    var validate = await ytdl.validateURL(args[0]);
 
    if (!validate) {
        let commandFile = require(`./hjksdasdssd.js`);
        return commandFile.run(client, message, args, ops);
    }
 
    var info = await ytdl.getInfo(args[0]);
 
    var data = ops.active.get(message.guild.id) || {};
 
    if (!data.connection) data.connection = await message.member.voiceChannel.join();

    if (!data.queue) data.queue = [];

    data.guildID = message.guild.id;
 
    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if (!data.dispatcher) {
        Play(client, ops, data);
    } else {
 
        message.channel.send(`Now playing: ${info.title} | Requested by: ${message.author.tag}`);
 
    }
 
    ops.active.set(message.guild.id, data);
 
}
 
async function Play(client, ops, data) {
 
    client.channels.get(data.queue[0].announceChannel).send(`Now playing: ${data.queue[0].songTitle} | Requested by: ${data.queue[0].requester}`);
 
    var options = { seek: 2, volume: 1, bitrate: 128000 };
 
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: "audioonly" }), options);

    data.dispatcher.guildID = data.guildID;
 
    data.dispatcher.once('end', function () {
 
        Finish(client, ops, this);
 
    });
 
}
 
function Finish(client, ops, dispatcher) {
 
    var fetchedData = ops.active.get(dispatcher.guildID);
 
    fetchedData.queue.shift();
 
    if (fetchedData.queue.length > 0) {
 
        ops.active.set(dispatcher.guildID, fetchedData);
 
        Play(client, ops, fetchedData);
 
    } else {
 
        ops.active.delete(dispatcher.guildID);
 
        var voiceChannel = client.guilds.get(dispatcher.guildID).me.voiceChannel;
 
        if (voiceChannel) voiceChannel.leave();
 
    }
 
}
 
exports.help = {
    name: "play",
    usage: "!play <url/searchterm>",
    description: "Lets the bot play a song."
}