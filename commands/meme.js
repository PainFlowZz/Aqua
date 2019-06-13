const Discord = require("discord.js");
const superagent = require('superagent');
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
module.exports.run = async (msg, message) => {
    var ChannelName = message.channel.name
    let{body} = await superagent
  .get(`https://api-to.get-a.life/meme`);

  let me = new Discord.RichEmbed()
  .setColor(colour)
  .setImage(body.url);


 message.channel.send(me);
}

module.exports.help = {
    name: "meme",
}