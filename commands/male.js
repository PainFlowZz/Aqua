
const Discord = require("discord.js");
const superagent = require('superagent');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
module.exports.run = async (msg, message) => {

  const embed = new Discord.RichEmbed()
  .setColor(rcolour)
  .setDescription("❯ Please create `Male` and `Female role! `❌`")

  let role = message.guild.roles.find(r => r.name === "Male");
  if (!role) return message.channel.send(embed)
  

  const gembed = new Discord.RichEmbed()
  .setColor(rcolour)
  .setDescription("❯ You already have a gender role. If you want to change it do `!transgender` `❌`")

  if (message.member.roles.find(r => r.name === "Male")) return message.channel.send(gembed)
  if (message.member.roles.find(r => r.name === "Female")) return message.channel.send(gembed)
  message.member.addRole(role.id)




  let rembed = new Discord.RichEmbed()
  .setDescription("`✔️`")
  .setColor(colour)    
  
 message.channel.send(rembed);

}

module.exports.help = {
    name: "male"
}