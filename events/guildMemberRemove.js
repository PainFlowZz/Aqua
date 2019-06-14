const Discord = require("discord.js")

module.exports = async (client, member) => {

    let settings;
    try {
        settings = await client.getGuild(member.guild);
    } catch (error) {
        console.error(error);
    }
    
    let userLogs = member.guild.channels.get(settings.leaveChannel);
    if(!userLogs) return
    const embed = new Discord.RichEmbed()
    .setColor("#e74c3c")
    .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL)
    .setFooter('User left')
    .setTimestamp()
    
    userLogs.send(embed);

    member.guild.channels.get('588009709114753026').setName(`Total Users: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size;
    member.guild.channels.get('588009733278007298').setName(`Member Count: ${humans}`)
    let bots = member.guild.members.filter(m => m.user.bot).size;
    member.guild.channels.get('588009754253721601').setName(`Bot Count: ${bots}`)

};