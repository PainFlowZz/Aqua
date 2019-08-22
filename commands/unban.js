const Discord = require('discord.js');
const { colour } = require ("../colours.json");

exports.run = async (client, message, args, settings) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return

  let user = args[0]
  if(!user) return message.channel.send('Please provide a user-id!')

  let log = message.guild.channels.get(settings.loggingChannel)

  let reason = args.join(" ").slice(22);
  if(!reason) reason = "No reason given."

  message.guild.unban(user, {reason: reason});
  
  message.channel.send(`Successfully unbanned <@${user.id}>!`)
  
  const embed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`❯ **Moderator:** ${message.author} (${message.author.id}) \n ❯ **Target:** ${message.mentions.users.first()} (${user.id}) \n ❯ **Action:** Unban \n ❯ **Reason:** ${reason}` )
  .setFooter('Server: ' + message.guild.name, message.guild.iconURL)
  .setTimestamp()
  
  try {
    log.send(embed)
  } catch (e) {
    return 
  }

}

exports.config = {
  name: "unban",
  usage: "!unban <user-id> [<reason>]",
  description: "Unbans a user."
}