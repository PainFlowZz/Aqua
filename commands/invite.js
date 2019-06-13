const Discord = require('discord.js');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
module.exports.run = async (cleint, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor(colour)
    .setDescription("❯ Invite URL [here](https://discordapp.com/api/oauth2/authorize?client_id=552909188901240844&permissions=8&scope=bot) \n ❯ Support Server [here](https://discordapp.com/invite/ANypce4)")

    message.channel.send(embed)
}

module.exports.help = {
    name : "invite"
}