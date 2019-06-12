const Discord = require('discord.js');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

const NoUserEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please provide a `user-id`! `❌`")

const NoLogChannel = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please create a log channel! `❌`")

const UserAuthorEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ You can't unban yourself! `❌`")

exports.run = async (client, message, args, settings) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return

  let user = args[0]
  if(!user) return message.channel.send(NoUserEmbed)

  let log = message.guild.channels.get(settings.loggingChannel)
  if(!log) return message.channel.send(NoLogChannel)

  let reason = args.join(" ").slice(22);
  if(!reason) reason = "No reason given."

  message.guild.unban(user, {reason: reason});
  
  const BanEmbed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`❯ <@${user.id}> has been unbanned!` + "`✔️`")
  message.channel.send(BanEmbed)
  
  const LogEmbed = new Discord.RichEmbed()
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setColor(colour)
  .setDescription(`❯ **Victim:** <@${user.id}> (${user.id}) \n ❯ **Action:** Unban \n ❯ **Reason:** ${reason}`)
  .setFooter(message.guild.name, message.guild.iconURL)
  .setTimestamp()
  
  log.send(LogEmbed)

}

exports.help = {
  name: "unban"
}