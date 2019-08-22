const Discord = require('discord.js');
const { colour } = require ("../colours.json");

exports.run = async (client, message, args, settings) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!user) return message.channel.send('Please provide a user!')
  if(user.id == message.author.id) return message.channel.send("Sorry, you can't ban yourself!")
  
  let log = message.guild.channels.get(settings.loggingChannel)

  let reason = args.join(" ").slice(22);
  if(!reason) reason = "No reason given."

  message.guild.member(user).ban(reason);
  
  message.channel.send(`Successfully banned ${user} from ${message.guild.name}!`)
  
  const embed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`➜ **Moderator:** ${message.author} (${message.author.id}) \n ➜ **Target:** ${message.mentions.users.first()} (${user.id}) \n ➜ **Action:** Ban \n ➜ **Reason:** ${reason}` )
  .setFooter("case#", message.guild.iconURL)
  .setTimestamp()
  
  try {
    log.send(embed)
  } catch (e) {
    return 
  }

}

exports.config = {
  name: "ban",
  usage: "!ban <@user> <reason>",
  description: "Bans a user!"
}