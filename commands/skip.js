const Discord = require("discord.js");

exports.run = async (msg, args, guild) => {
    const queue = new Map();
    const serverQueue = queue.get(msg.guild.id);
    
    if (!msg.member.voiceChannel) return msg.channel.send('Please join a Voice Channel to use music commands!');
		
    if (!serverQueue) return msg.channel.send('The queue is empty!');
    
    serverQueue.connection.dispatcher.end('Successfully skipped!');
    return undefined; 
}