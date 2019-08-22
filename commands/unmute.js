const Discord = require('discord.js');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

exports.run = async (client, message, args, settings) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!user) return message.channel.send('Please provide a user!')
  if(user.id === message.author.id) return

  if (user.roles.find(x => x.name === "Muted")) return message.channel.send(AlreadyMutedEmbed)

  let log = message.guild.channels.get(settings.loggingChannel)

  let reason = args.join(" ").slice(22);
  if(!reason) reason = "No reason given."

  let role = message.guild.roles.find(r => r.name === "Muted")
  if(!user.roles.find(x => x.name === "Muted")) return message.channel.send(NotMutedEmbed)

  await user.removeRole(role);
  
  message.channel.send(`Successfully unmuted ${user}!`)
    
  const embed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`❯ **Moderator:** ${message.author} (${message.author.id}) \n ❯ **Target:** ${message.mentions.users.first()} (${user.id}) \n ❯ **Action:** Unute \n ❯ **Reason:** ${reason}` )
  .setFooter('Server: ' + message.guild.name, message.guild.iconURL)
  .setTimestamp()
  
  try {
    log.send(embed)
  } catch (e) {
    return 
  }
}

exports.config = {
  name: "unmute",
  usage: "!unmute <@user> [<reason>]",
  description: "Unmutes a user."
}