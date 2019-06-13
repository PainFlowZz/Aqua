const Discord = require('discord.js');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

exports.run = async (cleint, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle("If you want to share your code, its better to paste it!")
    .setDescription("❯ 1 https://hastebin.com/ \n ❯ 2 https://ghostbin.com/")

    message.channel.send(embed)
}

exports.help = {
    name : "paste"
}