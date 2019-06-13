const Discord = require('discord.js');
const Coins = require('../models/profile.js')
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
exports.run = async (bot, message, args, settings) => {

    Coins.find({
      guildID: message.guild.id
    }).sort([
      ['coins', 'descending']
    ]).exec((err, res) => {
      if (err) console.log(err);
  
      let embed = new Discord.RichEmbed()
        .setAuthor("Yuki Leaderboard Command", message.guild.iconURL)
        .setThumbnail(bot.user.avatarURL)
        .setTitle("Coin Leaderboard")
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp()

      if (res.length === 0) {
        embed.setColor(rcolour);
        embed.addField("No data found", "Please type in chat to gain coins!")
      } else if (res.length < 10) {

        embed.setColor(colour);
        for (i = 0; i < res.length; i++) {
          let member = message.guild.members.get(res[i].userID) || "User Left"
          if (member === "User Left") {
            embed.addField(`${i + 1}. ${member}`, "❯ Coins : `" + res[i].coins +"`");
          } else {
            embed.addField(`${i + 1}. ${member.user.username}`, "❯ Coins : `" + res[i].coins +"`");
          }
        }
      } else {

        embed.setColor(colour);
        for (i = 0; i < 10; i++) {
          let member = message.guild.members.get(res[i].userID) || "User Left"
          if (member === "User Left") {
            embed.addField(`${i + 1}. ${member}`, "❯ Coins : `" + res[i].coins +"`");
          } else {
            embed.addField(`${i + 1}. ${member.user.username}`, "❯ Coins : `" + res[i].coins +"`");
          }
        }
      }
  
      message.channel.send(embed);
    })

}
module.exports.help = {
    name: "lb"
}