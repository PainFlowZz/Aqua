const Discord = require("discord.js")
const { colour } = require ("../colours.json");

module.exports.run = async (bot, message, args, settings) => {
    
  if(!message.member.hasPermission("ADMINISTRATOR")) return

  let emoji = message.guild.emojis.find(x => x.name === "aqua_cry");

  const prefix = settings.prefix


  const HelpEmbed = new Discord.RichEmbed()
  .setColor(colour)
  .setTitle(emoji + " **Checklist!**")
  .addField('1 ➜ Setup Permissions', 'Please make sure that I have all Permissions so I can run every command.')
  .addField('2 ➜ Setup Configuration', `Run ${settings.prefix}config to setup the Configuration.`)
  .addField('3 ➜ Make sure Everything works', 'Try some commands and see if I can run them. If you have any issues, join the Support Server [here](https://discord.gg/gjASDYh).')

  message.channel.send(HelpEmbed)
    
}

exports.config = {
  name: "checklist",
  usage: "!checklist",
  description: "Displays the checklist",
  accessableby: "Administrators"
}