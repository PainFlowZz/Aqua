exports.run = async (client, message, args, ops) => {
    
    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDDate) return message.channel.send("There is no playing song.")

    if (message.guild.me.voiceChannel !== message.member.voiceChannel) return message.channel.send("I'm not in your voice channel.");   
    
    if(isNaN(args[0]) || args[0] > 150 || args[0] < 0) return message.channel.send("Please provide a number between 0 and 150.");

    if(!args[0]) message.channel.send(`Current volume: ${guildIDData.dispatcher.volume}`)

    guildIDData.dispatcher.setVolume(args[0] / 100);

    message.channel.send(`Successfully set the volume to ${args[0]}`);
} 

exports.config = {
    name: "volume",
    usage: "!volume",
    description: "Changes the volume of the music."
}