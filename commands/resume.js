exports.run = async (client, message, args, ops) => {
    
    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no playing song.")

    if (message.guild.me.voiceChannel !== message.member.voiceChannel) return message.channel.send("I'm not in your voice channel.");   
    
    if (!guildIDData.dispatcher.paused) return message.channel.send("The music is not paused.")

    guildIDData.dispatcher.resume();

    message.channel.send("Successfully resumed the music.")
}

exports.config = {
    name: "resume",
    usage: "!resume",
    description: "Lets the bot resume the music."
}