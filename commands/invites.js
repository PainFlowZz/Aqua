const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
module.exports.run = async (bot, message, args) => {

    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send("Sorry I can't view the invites!");
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function(invites) {
        possibleinvites.push(`${invites.inviter.username} | ${invites.uses}`)
    })

    if (possibleinvites === null) possibleinvites = none
    const embed = new Discord.RichEmbed()
        .setColor(colour)
        .addField('❯ Invites', `\`\`\`${possibleinvites.join('\n')}\`\`\``)
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp()
    message.channel.send(embed);

}

exports.config = {
    name: "invites",
    usage: "!invites",
    description: "Sends a invite leadboard!",
    accessableby: "Everyone"
}