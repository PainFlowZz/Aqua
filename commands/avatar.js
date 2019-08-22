const Discord = require('discord.js');
const { colour } = require ("../colours.json");

exports.run = async (message) => {
    
    let user = message.mentions.users.first() || message.author

    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`)
    .setColor(colour)
    .setImage(user.displayAvatarURL)
    
    message.channel.send(embed);
    
}

exports.config = {
    name: "avatar",
    usage: "!avatar [<@user>]",
    description: "Displays the avatar of a user."
}