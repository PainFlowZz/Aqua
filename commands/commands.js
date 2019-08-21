const Discord = require("discord.js")
const { colour } = require ("../colours.json");

module.exports.run = async (bot, message, args, settings) => {
    
    let emoji = message.guild.emojis.find(x => x.name === "aqua_dance");

    const prefix = settings.prefix

        const HelpEmbed = new Discord.RichEmbed()
        .setColor(colour)
        .setTitle(emoji + "**Commands!**")
        .setDescription(`If you need help with a command, run ${prefix}help <command>`)
        .addField('➜ Commands', "If you need help with a command, please run " + prefix +"help `<command>`. If you need a list of all commands, please run " + prefix + "commands.")
        .addField('➜ Issues', "If you run into any issues such as bugs or errors, please join the support server [here](https://discord.gg/kz4tzW).")
        .addField('➜ Suggestions', "If you have any suggestions, direct message my senpai pain.exe#0001. ")

        message.channel.send(HelpEmbed)
    
}

module.exports.help = {
    name: "commands",
    usage: "",
    description:"",
}