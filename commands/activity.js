const Discord = require('discord.js');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

const embed = new Discord.RichEmbed()
.setColor(colour)
.setDescription("❯ Please specify a `activity`! `❌`")

exports.run = async (bot, message, args) => {
    let status = args.join(' ')
    if(!status) return message.channel.send(embed)

    if(!message.author.id === "328448086412230658") return

    bot.user.setActivity(status)
}

exports.help = {
    name : "setactivity"
}