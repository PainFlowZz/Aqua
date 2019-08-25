exports.run = async (client, message, args, ops) => {

    if (!message.member.voiceChannel) return message.channel.send("You're not in a voice channel.");

    if (!message.guild.me.voiceChannel) return message.channel.send("I'm not in a voice channel.");

    if (message.guild.me.voiceChannel !== message.member.voiceChannel) return message.channel.send("I'm not in your voice channel.");

    message.guild.me.voiceChannelID.leave();

    message.channel.send("Successfully left the voice channel.")
}

exports.help = {
    name: "leave",
    usage: "!leave",
    description: "Lets the bot leave the voice channel."
}