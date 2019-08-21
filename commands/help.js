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
            .setTitle("`" + command.config.usage + "`")
            .addField("➜ Description", command.config.description)
            .addField("➜ Examples", "`" + command.config.e1 + command.config.e2 + command.config.e3 + "`")
            message.channel.send(embed);
        }
    }

    if(!args[0]) {
        const HelpEmbed = new Discord.RichEmbed()
        .setColor(colour)
        .setTitle(emoji + "**Hello! I'm Aqua!**")
        .addField('➜ Getting Started', `Run ${prefix}checklist to view the actions needed to set me up. You can also use ${prefix}config to view and update the configuration.`)
        .addField('➜ Commands', "If you need help with a command, please run " + prefix +"help `<command>`. If you need a list of all commands, please run " + prefix + "commands.")
        .addField('➜ Issues', "If you run into any issues such as bugs or errors, please join the support server [here](https://discord.gg/kz4tzW).")
        .addField('➜ Suggestions', "If you have any suggestions, direct message my senpai pain.exe#0001. ")

        message.channel.send(HelpEmbed)
    }
}