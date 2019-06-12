const Discord = require('discord.js');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

exports.run = async (client, message, args) => {
    let NoUserInputEmbed = new Discord.RichEmbed()
    .setColor(rcolour)
    .setDescription("❯ Please specify a valid `user`! `❌`")
    
    let buser = message.mentions.users.first() || message.author
    let guild = client.guilds.get(message.guild.id),
    
    USER_ID = buser;
  
    if (!guild.member(USER_ID)) return message.channel.send(NoUserInputEmbed)

    if(!buser) return message.channel.send(NoUserInputEmbed);

    let embed = new Discord.RichEmbed()
    .setAuthor(`${USER_ID.username}#${USER_ID.discriminator}`)
    .setColor(colour)
    .setImage(USER_ID.displayAvatarURL)
    
    message.channel.send(embed);
    
}

exports.help = {
    name : "avatar"
}
