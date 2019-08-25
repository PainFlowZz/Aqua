exports.run = async (message) => {
    
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return message.channel.send('⏸ Paused the music for you!');
    }
    return message.channel.send('There is nothing playing.');
}

exports.config = {
    name: "pause",
    usage: "!pause",
    description: "Lets the bot pause the music."
}