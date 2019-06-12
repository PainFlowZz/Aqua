const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
let embed = new Discord.RichEmbed()
  .setColor(rcolour)
  .setDescription("❯ Please specify a valid `user`! `❌`")



module.exports.run = async (client, message, args) => {
  	let cuser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.author;
  	let guild = client.guilds.get(message.guild.id)
  
  	USER_ID = cuser;

  	if (!guild.member(USER_ID)) return message.channel.send(embed);

	let profile;
    try {
        profile = await client.getProfile(cuser);
      } catch (error) {
        console.error(error);
      }	
    
	let settings;
    try {
        settings = await client.getGuild(message.guild);
      } catch (error) {
        console.error(error);
      }
    
    const embed1 = new Discord.RichEmbed()
    	.setColor(colour)
    	.setDescription("❯ <@"+cuser.id+"> has `" + profile.coins + "` coins ! `💰`")
    
    const embed2 = new Discord.RichEmbed()
    	.setColor(colour)
    	.setDescription("❯ You have `" + profile.coins + "` coins ! `💰`")

    if (cuser === message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])) return message.channel.send(embed1);
    if (cuser === message.author) return message.channel.send(embed2)
}

module.exports.help = {
	name: "coins"
}