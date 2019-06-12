const Discord = require('discord.js');
const weather = require('weather-js');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

const e1 = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription('❯ Please enter a location! `❌`')

const e2 = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription('❯ Please enter a valid location! `❌`')

exports.run = async (client, message, args) => {
  
  if(!args[0]) return message.channel.send(e1);
  
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
    if (err) message.channel.send(err);
    if (result === undefined || result.length === 0) return message.channel.send(e2);

    var current = result[0].current;
    var location = result[0].location;
    const embed = new Discord.RichEmbed()
    .setDescription(`**${current.skytext}**`)
    .setAuthor(`❯ Weather for ${current.observationpoint}`)
    .setThumbnail(current.imageUrl)
    .setColor(colour)
    .addField('❯ Timezone',`UTC${location.timezone}`, true)
    .addField('❯ Degree Type',location.degreetype, true)
    .addField('❯ Temperature',`${current.temperature} Degrees`, true)
    .addField('❯ Feels Like', `${current.feelslike} Degrees`, true)
    .addField('❯ Winds',current.winddisplay, true)
    .addField('❯ Humidity', `${current.humidity}%`, true)
    message.channel.send({embed});
  })
}

exports.help = {
name: "weather"
}