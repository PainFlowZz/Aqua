const Discord = require('discord.js');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
module.exports.run = async (cleint, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor(colour)
    .setDescription("❯ If you want to vote for Yuki on discordbots.org, click [here](https://discordbots.org/bot/552909188901240844/vote)!")

    message.channel.send(embed)
}

module.exports.help = {
    name : "vote"
}