const Discord = require('discord.js');
const { colour } = require ("../colours.json");

exports.run = async (client, message, args) => {
    
    let user = message.mentions.users.first() || message.author

    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`)
    .setColor(colour)
    .setImage(user.displayAvatarURL)
    
    message.channel.send(embed);
    
}

exports.config = {
    name: "avatar",
    usage: "!avatar (optional) <@user>",
    description: "Shows a avatar!",
    accessableby: "Everyone"
}