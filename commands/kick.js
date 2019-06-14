const Discord = require('discord.js');
const { colour } = require ("../colours.json");

exports.run = async (client, message, args, settings) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!user) return message.channel.send('Please provide a user!')
  if(user.id === message.author.id) return message.channel.send(`Sorry, you can't ban yourself!`)
  
  let logs = message.guild.channels.get(settings.loggingChannel)

  let reason = args.join(" ").slice(22);
  if(!reason) reason = "No reason given."

  message.guild.member(user).kick(reason);
  
  message.channel.send(`Successfully kicked ${user} from ${message.guild.name}!`)
  
  const embed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`❯ **Moderator:** ${message.author} (${message.author.id}) \n ❯ **Target:** ${message.mentions.users.first()} (${user.id}) \n ❯ **Action:** Kick \n ❯ **Reason:** ${reason}` )
  .setFooter('Server: ' + message.guild.name, message.guild.iconURL)
  .setTimestamp()
  
  try {
    logs.send(embed)
  } catch (e) {
    return 
  }

}

exports.config = {
  name: "kick",
  usage: "!kick <@user> <reason>",
  description: "Kicks a user!",
  accessableby: "Administrators"
}