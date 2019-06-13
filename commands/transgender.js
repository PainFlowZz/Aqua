const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

exports.run = async (message) => {

	if(!message.member.roles.find(r => r.name === "Female") && !message.member.roles.find(r => r.name === "Male")){
 		
		const embed = new Discord.RichEmbed()
	 	.setColor(rcolour)
	 	.setDescription("Please choose a gender. !male or !female `❌`")
 		
 		message.channel.send(embed)
	}
	
	if (message.member.roles.find(r => r.name === "Male")) {

		const embed = new Discord.RichEmbed()
	 	.setColor(colour)
	 	.setDescription("You're now `Female` `✔️`")

		message.member.addRole(message.guild.roles.find(r => r.name === "Female"))
		message.member.removeRole(message.guild.roles.find(r => r.name === "Male"))
		message.channel.send(embed)
	}

	if (message.member.roles.find(r => r.name === "Female")) {

	 	const embed = new Discord.RichEmbed()
	 	.setColor(colour)
	 	.setDescription("You're now `Male` `✔️`")

	 	message.member.addRole(message.guild.roles.find(r => r.name === "Male"))
	 	message.member.removeRole(message.guild.roles.find(r => r.name === "Female"))
	 	message.channel.send(embed)
	
	}

}

exports.help = {
    name: "transgender"
}