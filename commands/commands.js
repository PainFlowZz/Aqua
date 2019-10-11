const Discord = require("discord.js")
const { colour } = require ("../colours.json");

module.exports.run = async (bot, message, args, settings) => {
    
    let emoji = message.guild.emojis.find(x => x.name === "aqua_dance");

    const prefix = settings.prefix

    const HelpEmbed = new Discord.RichEmbed()
    .setColor(colour)
    .setTitle(emoji + "**Commands!**")
    .setDescription(`If you need help with a command, run ${prefix}help <command>`)
    .addField(`__**Moderation**__`, "`clear` `ban` `kick` `mute` `tempmute` `unban` `unmute`")
    .addField(`__**Music**__`, "`np` `pause` `play` `queue` `resume` `skip` `stop` `vol`")
    .addField(`__**Other**__`, "`avatar` `checklist` `config`")
    .addField(`__**Utility**__`, "`info` `invites` `serverinfo` `weather` `urban`")

    message.channel.send(HelpEmbed)
    
}

exports.config = {
    name: "commands",
    usage: "!commands",
    description: "Displays all commands."
}