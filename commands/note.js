const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
module.exports.run = async (client, message, args, settings) => {
  if(!message.author.id === "328448086412230658") return
  let notechannel = message.guild.channels.get("564777076041711622");
  let note = args.slice(0).join(' ');
  if(!note) return message.channel.send("Please specify a note, daddy! <3").then(message => {message.delete(5000)});

  const embed = new Discord.RichEmbed()
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .setTitle("❯ Note :")
  .setColor(colour)
  .setDescription(note)
  .setTimestamp()

  notechannel.send(embed);
}
module.exports.help = {
  name: "note"
}

