const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
exports.run = async (client, message, args) => {

    let meow = await fetch('http://aws.random.cat/meow')
        .then(res => res.json())
        .then(json => json.file);

    let embed = new RichEmbed()
        .setAuthor(message.member.user.tag, message.member.user.avatarURL)
        .setColor(colour)
        .setImage(meow);

    message.channel.send(embed);

};

exports.help = {
    name: 'meow'
};