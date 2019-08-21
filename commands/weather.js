const Discord = require('discord.js');
const weather = require('weather-js');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

exports.run = async (client, message, args) => {
  
  if(!args[0]) return message.channel.send("Please specify a location!");
  
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
    if (err) message.channel.send(err);
    if (result === undefined || result.length === 0) return message.channel.send("Pleasy specify a valid location!");

    var current = result[0].current;
    var location = result[0].location;
    const embed = new Discord.RichEmbed()
    .setDescription(`**${current.skytext}**`)
    .setTitle(`${current.observationpoint}`, client.user.avatarURL)
    .setThumbnail(current.imageUrl)
    .setColor(colour)
    .addField('Timezone',`UTC${location.timezone}`, true)
    .addField('Degree Type',location.degreetype, true)
    .addField('Temperature',`${current.temperature} Degrees`, true)
    .addField('Feels Like', `${current.feelslike} Degrees`, true)
    .addField('Winds',current.winddisplay, true)
    .addField('Humidity', `${current.humidity}%`, true)
    message.channel.send({embed});
  })
}

exports.config = {
  name: "weather",
  usage: "!weather <location>",
  description: "",
  accessableby: "Everyone"
}