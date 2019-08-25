exports.run = async (client, message, args, ops) => {
    
    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no playing song.")

    if (message.guild.me.voiceChannel !== message.member.voiceChannel) return message.channel.send("I'm not in your voice channel.");   
    
    if (guildIDData.dispatcher.paused) return message.channel.send("The music is already paused.")

    guildIDData.dispatcher.pause();

    message.channel.send("Successfully paused the music.")
}

exports.config = {
    name: "pause",
    usage: "!pause",
    description: "Lets the bot pause the music."
}