const Discord = require("discord.js")
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
module.exports.run = async (client, message, args, settings) => {

    let welcomeChannel1 = message.guild.channels.get(settings.welcomeChannel)
    let leaveChannel1 = message.guild.channels.get(settings.leaveChannel)
    let loggingChannel1 = message.guild.channels.get(settings.loggingChannel)
    let autoRole1 = message.guild.roles.get(settings.autoRole)

    if (welcomeChannel1=== undefined)  welcomeChannel1 = "`Not set - please execute " + settings.prefix + "setconfig welcomeChannel <#channel>`";
    if (loggingChannel1 === undefined)  loggingChannel1 = "`Not set - please execute " + settings.prefix + "setconfig loggingChannel <#channel>`";
    if (autoRole1 === undefined)  autoRole1 = "`Not set - please execute " + settings.prefix + "setconfig autoRole <@role>`";
    if (leaveChannel1 === undefined) leaveChannel1 = "`Not set - please execute " + settings.prefix + "setconfig leaveChannel <#channel>`";
    const testaembed = new Discord.RichEmbed()
    .setAuthor("Server Config")
    .setColor(colour)
    .setThumbnail(message.guild.iconURL)
    .addField("❯ Prefix : ", "`"+ settings.prefix + "`" )
    .addField("❯ Welcome-Channel :", welcomeChannel1)
    .addField("❯ Leave-Channel :", leaveChannel1)
    .addField("❯ Logging-Channel :", loggingChannel1)
    .addField("❯ Auto-Role :", autoRole1)
    .addField("❯ Avaible Settings : ", "`loggingChannel` `prefix` `autoRole` `welcomeChannel` `leaveChannel`")
    .setTimestamp()
    .setFooter("yuki", client.user.avatarURL)

    message.channel.send(testaembed);   
}

exports.config = {
    name: "config",
    usage: "!config",
    description: "Shows the config!",
    accessableby: "Everyone"
}