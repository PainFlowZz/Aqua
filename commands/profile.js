const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

let embed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please specify a valid `user`! `❌`")

exports.run = async (client, message, args) => {
  let cuser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.author;
  let guild = client.guilds.get(message.guild.id)
  
  USER_ID = cuser;

  if (!guild.member(USER_ID)) return message.channel.send(embed);

	let profile;
  try {
    profile = await client.getProfile(cuser);
  } catch (error) {
    console.error(error)
  }	
     
  const embed1 = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor(colour)
  .addField("❯ Balance `💰`", "`" + profile.coins + "`", true)
  .addField("❯ Level `🆙`", "`" + "Comming Soon" + "`", true)
  .addField("❯ Xp `🎚️`", "`" + profile.xp + "`", true)
  .setFooter("yuki", client.user.avatarURL, true)
  .setTimestamp()
    
  message.channel.send(embed1)
}

exports.help = {
	name: "xp"
}