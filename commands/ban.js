const Discord = require('discord.js');
const { colour } = require ("../colours.json");

exports.run = async (client, message, args, settings) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry, you dont have enough permissions.")
  
  user = message.mentions.members.first() || message.guild.members.get(args[0])
  if (!user) return message.channel.send("Please provide a user.")
  if(user.id === message.author.id) return message.channel.send("Sorry, you can't ban yourself.")
  
  let loggingChannel = message.guild.channels.get(settings.loggingChannel)

  let reason = args[1]
  if(!reason) return message.channel.send("Please specify a reason.")
  
  let days = args.slice(2).join(" ")
  if(!days) days = 360

  let modembed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`➜ **Action:** Ban \n➜ **Target:** ${message.mentions.users.first()} (${user.id}) \n➜ **Moderator:** ${message.author} (${message.author.id}) \n➜ **Days:** ${days} \n➜ **Reason:** ${reason}`)
  .setTimestamp()
  
  if(settings.loggingChannel !== "none") loggingChannel.send(modembed)

  message.guild.ban(user, { days: days, reason: reason}).then(() => message.guild.unban(user.id)).catch(err => console.log(err))
}

exports.config = {
  name: "ban",
  usage: "!ban <@user> [<reason>] [<days>]",
  description: "Bans a user."
}