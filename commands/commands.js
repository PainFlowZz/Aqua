const Discord = require("discord.js")
const { colour } = require ("../colours.json");

module.exports.run = async (bot, message, args, settings) => {
    
    let emoji = message.guild.emojis.find(x => x.name === "minecraft_chest");

    const prefix = settings.prefix

    const HelpEmbed = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle(emoji + "**Commands!**")
    .setDescription(`If you need help with a command, run ${prefix}help <command>`)

    message.channel.send(emoji+ " Take a look at your DMs!")
    message.author.send(HelpEmbed)
    
}

module.exports.help = {
    name: "commands",
    usage: "",
    description:"",
}