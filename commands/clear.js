const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
const MissingPermissionEmbed = new Discord.RichEmbed()
  .setColor(rcolour)
  .setDescription("❯ Missing permission : `MANAGE_MESSAGES` `❌`")       
const ErrorEmbed = new Discord.RichEmbed()
  .setColor(rcolour)
  .setDescription("❯ Please use a `number` as your argument! `❌`")
const ErrorEmbed2 = new Discord.RichEmbed()
  .setColor(rcolour)
  .setDescription("❯ The maximum amount of messages I can delete at once is `100` ! `❌`")
const NoChannelEmbed = new Discord.RichEmbed()
  .setColor(rcolour)
  .setDescription("❯ Please create/set a `'logging'` channel! `❌`") 

  module.exports.run = async (bot, message, args) => {  
    const deleteCount = parseInt(args[0], 10);
    
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(MissingPermissionEmbed);
    
    if (args > 100) return message.channel.send(ErrorEmbed2)
    
    if(!deleteCount) return message.channel.send(ErrorEmbed)
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)

}  

module.exports.help = {
    name: "clear"
}
