exports.run = async (client, message, args, ops) => {
    
    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDDate) return message.channel.send("There is no playing song.")

    if (message.guild.me.voiceChannel !== message.member.voiceChannel) return message.channel.send("I'm not in your voice channel.");   
    
    var amountUsers = message.member.voiceChannel.members.size;

    var amountSkip = Math.ceil(amountUsers / 2);

    if (!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];

    if (guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send("You already voted.")

    guildIDData.queue[0].voteSkips.push(message.member.id);

    ops.active.set(message.guild.id, guildIDData);

    if (guildIDData.queue[0].voteSkips.length >= amountSkip) {
 
        message.channel.send("Successfully skipped.");
 
        return guildIDData.dispatcher.end();
 
    }

    message.channel.send(`Successfuly voted. ${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);

} 

exports.config = {
    name: "skip",
    usage: "!skip",
    description: "Skips the currently playing song."
}