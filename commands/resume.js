exports.run = async (message) => { 
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send('▶ Resumed the music for you!');
    }
    return message.channel.send('There is nothing playing.');
}

exports.config = {
    name: "resume",
    usage: "!resume",
    description: "Lets the bot resume the music."
}