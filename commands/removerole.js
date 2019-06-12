const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

const MissingPermissionEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Missing permission : `ADMINISTRATOR` `❌`") 

const NoChannelEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please create a `'logging'` channel! `❌`") 

let NoUserInputEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please specify a valid `user`! `❌`")

let NoRoleInputEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please specify a `role`! `❌`")

let InvalidRoleEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please specify a `valid` role! `❌`")
  
let AlreadyHasEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ This user does not have this role! `❌`")   

exports.run = async (client, message, args, settings) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(MissingPermissionEmbed);
  
  let logs = message.guild.channels.get(settings.loggingChannel);
  if(!logs) return message.channel.send(NoChannelEmbed);  
  
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.channel.send(NoUserInputEmbed);
  
  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send(NoRoleInputEmbed);
  
  let gRole = message.guild.roles.find(r => r.name === role);
  if(!gRole) return message.channel.send(InvalidRoleEmbed);

  if(!rMember.roles.has(gRole.id)) return message.channel.send(AlreadyHasEmbed);
  await(rMember.removeRole(gRole.id));

  const embed = new Discord.RichEmbed()
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .setColor(colour)
  .setDescription(`❯ **Member:** ${message.mentions.users.first().tag} (${rMember.id}) \n ❯ **Action:** Removerole \n ❯ **Role:** ${role}`)
  .setTimestamp()

  logs.send(embed)

}

exports.help = {
  name: "removerole"
}
