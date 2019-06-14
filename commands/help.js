const Discord = require("discord.js")
const { colour } = require ("../colours.json");
module.exports.run = async (bot, message, args, settings) => {
    const prefix = settings.prefix

    if(args[0] == "help") return message.channel.send(`Just do ${prefix}help instead!`)

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
        .setAuthor("❯ Commands")
        .setColor(colour)
        .setDescription('A list of all avaiable commands. \n For additional info on a command, type `!help <command>`')
        .addField('❯ Config', '`config` `reset` `setconfig`')
        .addField('❯ Info', '`botinfo` `serverinfo` `weather`')
        .addField('❯ Mod', '`addrole` `ban` `clear` `kick` `mute` `removerole` `tempmute` `unban` `unmute`')
        .addField('❯ Music', '`np` `pause` `play` `queue` `resume` `skip` `stop` `vol`')
        .addField('❯ Util', '`avatar` `eval` `help` `invites` `ping` `say` `uptime`')
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp()
        message.channel.send(HelpEmbed)
    }
}