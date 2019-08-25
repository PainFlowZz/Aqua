exports.run = async (message) => {
 
    const { voiceChannel } = message.member;
    if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end('Stop command has been used!');

}

 
exports.help = {
    name: "stop",
    usage: "!stop",
    description: "Stops the music."
}