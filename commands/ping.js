const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

exports.run = async (bot, message) => {
    let botembed = new Discord.RichEmbed()
    .setColor(colour)
    .setDescription(`Loading...`)

    message.channel.send(botembed).then(message =>{
        botembed.setColor(colour)
        botembed.setDescription(`pong! **\`${bot.pings[0]}ms\`**`)

        message.edit(botembed)
    })

}

exports.help = {
    name: "ping"
}