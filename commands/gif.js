const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
module.exports.run = async (client, message, args) => {

    if (!message.channel.nsfw) return 
    
    
    let replies = ["https://cdn.boob.bot/Gifs/17C5.gif", "https://cdn.boob.bot/boobs/80008AA6.gif", "https://cdn.boob.bot/boobs/80004C49.gif", "https://cdn.boob.bot/boobs/8000B337.gif", "https://cdn.boob.bot/boobs/8000DA92.gif", "https://im.ezgif.com/tmp/ezgif-1-0ef7fcd9d860.gif", "https://im.ezgif.com/tmp/ezgif-1-75cc3833c3d9.gif", "http://africa-international.info/pictures/twerk-gif-full-nude-pussy-2.jpg", "https://im.ezgif.com/tmp/ezgif-1-11a09f259036.gif", "https://im.ezgif.com/tmp/ezgif-1-7b6c492834e1.gif", "https://cdn.boob.bot/Gifs/1963.gif", "https://cdn.boob.bot/Gifs/15DA.gif", "https://cdn.boob.bot/Gifs/1887.gif", "https://cdn.boob.bot/Gifs/182B.gif", "https://cdn.boob.bot/Gifs/18C9.gif"]
    let result = Math.floor((Math.random() * replies.length));

    let pawgembed = new Discord.RichEmbed()
        .setTitle("Here!")
        .setColor(colour)
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
        .setImage(replies[result]);

    message.channel.send(pawgembed);


};

module.exports.help = {
    name: "gif"
}