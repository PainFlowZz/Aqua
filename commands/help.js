const Discord = require("discord.js")
const { colour } = require ("../colours.json");

module.exports.run = async (bot, message, args, settings) => {
    
    let emoji = message.guild.emojis.find(x => x.name === "aqua_yeah");

    const prefix = settings.prefix

    if(args[0] === "help") return;

    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)) {
            command = bot.commands.get(command);
            
            var embed = new Discord.RichEmbed()
            .setColor(colour)
            .setDescription("**❯ Command:** " + command.config.name + "\n**❯ Description:** " + command.config.description + "\n**❯ Usage:** " + command.config.usage + "\n**❯ Accessable by:** " + command.config.accessableby)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
            .setTimestamp()
            message.channel.send(embed);
        }
    }

    if(!args[0]) {
        const HelpEmbed = new Discord.RichEmbed()
        .setColor(colour)
        .setTitle(emoji + "**Hello! I'm Aqua!**")
        .addField('➜ Getting Started', `Please run ${prefix}checklist to view the actions needed to set me up.`)
        .addField('➜ Commands', "If you need help with a command, please run " + prefix +"help `<command>`. If you need a list of all commands, please run " + prefix + "commands.")
        .addField('➜ Issues', "If you run into any issues such as bugs or errors, please join the Support-Server [here](https://discord.gg/kz4tzW).")
        message.channel.send(HelpEmbed)
    }
}