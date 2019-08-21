const dateFormat = require('dateformat');
const Discord = require("discord.js");
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

exports.run = async (bot, msg) => {
    const millis = new Date().getTime() - msg.guild.createdAt.getTime();
    const days = millis / 1000 / 60 / 60 / 24;
    
    let emoji = msg.guild.emojis.find(x => x.name === "aqua_fingerspin");
    
    const owner = msg.guild.owner.user || {};
    const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
    let embed = new Discord.RichEmbed()   
    .setTitle(emoji + " **Serverinfo!**")
    .setColor(colour)
    .addField("➜ Days since creation", "`" + `${days.toFixed(0)}` + "`", true)
    .addField("➜ Region", "`" + `${msg.guild.region}` + "`", true)
    .addField("➜ Member count", "`" + `${msg.guild.members.filter(m => m.presence.status !== 'offline').size} / ${msg.guild.memberCount}` + "`", true)
    .addField("➜ Owner", "`" + `${owner.username || 'None'}` + "`", true)
    .addField("➜ Text-channels", "`" + `${msg.guild.channels.filter(m => m.type === 'text').size}` + "`", true)
    .addField("➜ Voice-channels", "`" + `${msg.guild.channels.filter(m => m.type === 'voice').size}` + "`", true)
    .addField("➜ Verification level", "`" + `${verificationLevels[msg.guild.verificationLevel]}` + "`", true)
    .addField("➜ Roles", "`" + `${msg.guild.roles.size -1}` + "`", true)

    msg.channel.send(embed)

};

exports.config = {
    name: "serverinfo",
    usage: "!serverinfo",
    description: "Shows information about the server!",
    accessableby: "Everyone"
}