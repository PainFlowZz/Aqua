const Discord = require('discord.js');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

const NoUserEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please specify a `user`! `❌`")

const NoLogChannel = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please create a log channel! `❌`")

const UserAuthorEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ You can't ban yourself! `❌`")

exports.run = async (client, message, args, settings) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!user) return message.channel.send(NoUserEmbed)
  if(user.id == message.author.id) return message.channel.send(UserAuthorEmbed)
  
  let log = message.guild.channels.get(settings.loggingChannel)
  if(!log) return message.channel.send(NoLogChannel)

  let reason = args.join(" ").slice(22);
  if(!reason) reason = "No reason given."

  message.guild.member(user).ban(reason);
  
  const BanEmbed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`❯ <@${user.id}> has been banned!` + "`✔️`")
  message.channel.send(BanEmbed)
  
  const LogEmbed = new Discord.RichEmbed()
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setColor(colour)
  .setDescription(`❯ **Victim:** <@${user.id}> (${user.id}) \n ❯ **Action:** Ban \n ❯ **Reason:** ${reason}`)
  .setFooter(message.guild.name, message.guild.iconURL)
  .setTimestamp()
  
  log.send(LogEmbed)

}

exports.help = {
  name: "ban"
}