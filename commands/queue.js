exports.run = async (bot, message, args, ops) => {
 
    var guildIDData = ops.active.get(message.guild.id);
 
    if (!guildIDData) return message.channel.send("There is no playing song.")
 
    var queue = guildIDData.queue;
    
    var nowPlaying = queue[0];
 
    var response = `Now playing: ${nowPlaying.songTitle} || requested by ${nowPlaying.requester}\n\nQueue: \n`;
 
    for (var i = 0; i < queue.length; i++) {
 
        response += `${i}, ${queue[i].songTitle} requested by ${queue[i].requester}\n`;
 
    }
   
    message.channel.send(response);
 
}
 
exports.help = {
    name: "queue",
    usage: "!queue",
    description: "Displays the queue."
}