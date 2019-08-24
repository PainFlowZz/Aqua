const Discord = require('discord.js');
const { colour } = require ("../colours.json");
const ms = require('ms');

exports.run = async (client, message, args, settings) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry, you dont have enough permissions.")
  
  user = message.mentions.members.first() || message.guild.members.get(args[0])
  if (!user) return message.channel.send("Please provide a user.")
  if(user.id === message.author.id) return message.channel.send("Sorry, you can't ban yourself.")
  
  let loggingChannel = message.guild.channels.get(settings.loggingChannel)

  let reason = args[1]
  if(!reason) return message.channel.send("Please specify a reason.")
  
  let days = args.slice(2).join(" ")

  if(isNaN(days)){
    return message.channel.send("Please use only numbers as your days argument.")
  }
  
  let modembed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`➜ **Action:** Ban \n➜ **Target:** ${message.mentions.users.first()} (${user.id}) \n➜ **Moderator:** ${message.author} (${message.author.id}) \n➜ **Days:** ${days} \n➜ **Reason:** ${reason}`)
  .setTimestamp()
  
  if(settings.loggingChannel !== "none") loggingChannel.send(modembed)

  let time = days + "d"

  if (ms(time)) {
    await message.guild.ban(user, { days: days, reason: reason })

    message.channel.send(`Successfully banned ${user} from ${message.guild.name} for ${days}days.`);
  
    setTimeout(function () {

      message.guild.unban(user.id);
      
      message.channel.send(`Successfully unbanned ${user} from ${message.guild.name}.`)
    }, ms(time));

  } else {
    return message.guild.ban(user).then(message.channel.send(`Successfully banned ${user} from ${message.guild.name}.`))
  }

}

exports.config = {
  name: "ban",
  usage: "!ban <@user> <reason> [<days>]",
  description: "Bans a user."
}