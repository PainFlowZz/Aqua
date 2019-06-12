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
.setDescription("❯ You can't mute yourself! `❌`")

const NotMutedEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ This user is not muted! `❌`")

exports.run = async (client, message, args, settings) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!user) return message.channel.send(NoUserEmbed)
  if(user.id === message.author.id) return message.channel.send(UserAuthorEmbed)

  if (user.roles.find(x => x.name === "Muted")) return message.channel.send(AlreadyMutedEmbed)

  let log = message.guild.channels.get(settings.loggingChannel)
  if(!log) return message.channel.send(NoLogChannel)

  let reason = args.join(" ").slice(22);
  if(!reason) reason = "No reason given."

  let role = message.guild.roles.find(r => r.name === "Muted")
  if(!user.roles.find(x => x.name === "Muted")) return message.channel.send(NotMutedEmbed)

  await user.removeRole(role);
  
  const MuteEmbed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`❯ <@${user.id}> has been unmuted!` + "`✔️`")
  message.channel.send(MuteEmbed)
    
  const LogEmbed = new Discord.RichEmbed()
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setColor(colour)
  .setDescription(`❯ **Victim:** <@${user.id}> (${user.id}) \n ❯ **Action:** Unmute \n ❯ **Reason:** ${reason}`)
  .setFooter(message.guild.name, message.guild.iconURL)
  .setTimestamp()
    
  log.send(LogEmbed)
}

exports.help = {
  name: "unmute"
}