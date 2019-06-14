const Discord = require("discord.js")
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

exports.run = async (bot, message) => {

    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return  "`" + days.padStart(2, '0') + "` days, " + "`" + hrs.padStart(2 , '0') + "` hours, " + "`" + min.padStart(2 , '0') + "` minutes, " + "`" + sec.padStart(2, '0') + "` seconds"
    }

    const embed = new Discord.RichEmbed()
    .setColor(colour)
    .setDescription(`I have been online for: ${duration(bot.uptime)}`)
        
    message.channel.send(embed)

}

exports.config = {
    name: "uptime",
    usage: "!uptime",
    description: "Shows the uptime of <none>!",
    accessableby: "Everyone"
}