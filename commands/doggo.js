const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
exports.run = async (client, message, args) => {

    let doggo = await fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(json => json.message);

    // anthony#8577
    let embed = new RichEmbed()
        .setAuthor(message.member.user.tag, message.member.user.avatarURL)
        .setColor(colour)
        .setImage(doggo)
        .setFooter(`❯ A random doggo!`)
        .setTimestamp();

    message.channel.send(embed);

};

exports.help = {
    name: 'doggo'
};