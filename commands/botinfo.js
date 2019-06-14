const Discord = require("discord.js")
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
const version = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")

exports.run = (bot, message, args) => { // eslint-disable-line no-unused-vars

    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const embedStats = new Discord.RichEmbed()
            .setAuthor("❯ Botinfo Command")
            .setDescription("Information about the hardware \n For additional information about the bot, just swipe to page 2")
            .setThumbnail(bot.user.avatarURL)
            .setColor(colour)
            .addField("❯ Mem Usage", "`" + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB `", true)
            .addField("❯ Uptime ", "`" + duration + "`", true)
            .addField("❯ Users", "`" + bot.users.size.toLocaleString()+ "`", true)
            .addField("❯ Servers", "`" + bot.guilds.size.toLocaleString() + "`", true)
            .addField("❯ Channels ", "`" + bot.channels.size.toLocaleString() + "`" , true)
            .addField("❯ CPU usage", "`" + percent.toFixed(2)+ "%`", true)
            .addField("❯ CPU", "`" + os.cpus().map(i => `${i.model}`)[0]+ "`", true)
            .addField("❯ Platform", "`" + os.platform()+ "`", true)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
            .setTimestamp()
        message.channel.send(embedStats)
    
        const embedInfo = new Discord.RichEmbed()
        .setDescription("Test")
        message.edit(embedInfo)
    
    });
};


exports.config = {
    name: "botinfo",
    usage: "!botinfo",
    description: "Shows information about the bot!",
    accessableby: "Everyone"
}