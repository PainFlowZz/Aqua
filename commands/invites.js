const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
module.exports.run = async (bot, message, args) => {
    const eembed = new Discord.RichEmbed()
        .setColor(rcolour)
        .setDescription('Sorry, I can\'t view the invites! `❌`')
    
    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send(eembed);
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function(invites) {
        possibleinvites.push(`${invites.inviter.username} ||  ${invites.uses}`)
    })

    if (possibleinvites === null) possibleinvites = none
    const embed = new Discord.RichEmbed()
        .setAuthor("Yuki Invite-Leaderboard", message.guild.iconURL)
        .setColor(colour)
        .setThumbnail(bot.user.avatarURL)
        .addField('❯ Invites', `\`\`\`${possibleinvites.join('\n')}\`\`\``)
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp()
    message.channel.send(embed);

}

module.exports.help = {
    name: "invites"
}