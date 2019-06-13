const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

module.exports.run = async (client, message, args) => {

    if (!message.channel.nsfw) return 
    
    let replies = ["https://nekobot.xyz/ass/itgcyrb4ez2jah38wxl7.jpg", "https://pbs.twimg.com/media/CHGBNzPW0AEn35I?format=png&name=small", "https://cdn.boob.bot/pawg/5CBA.jpg", "https://cdn.boob.bot/pawg/4A44.jpg", "https://preview.redd.it/jbeusvgbnfs11.jpg?width=960&crop=smart&auto=webp&s=8261a831aa2c35aa4ce027f5dce1551097a198ca", "https://i.imgur.com/JYk7NiJ.png", "https://i.imgur.com/6eMFDyG.png", "https://i.imgur.com/V2MRHzR.png", "https://i.imgur.com/vfPa4ng.jpg", "https://i.imgur.com/M2SlhtV.png", "https://i.imgur.com/oM7kEL5.jpg", "https://i.imgur.com/pQiOFRx.png", "https://i.imgur.com/Raz6EKR.png", "https://i.imgur.com/x1WqJfv.png", "https://i.imgur.com/Czk7YlX.jpg", "https://external-preview.redd.it/1Qvb9jyK13gwoW1-pw1ulBxPOwgpWKhlMl5vre07FIM.jpg?width=640&crop=smart&auto=webp&s=207f70ae7b0dd41bea371f04fc5aaaca7a18ccfe", "https://preview.redd.it/g8cf4ok6xus21.jpg?width=640&crop=smart&auto=webp&s=015b6e67ac5052ef930a51ab671a4b8fc2eea4ee", "https://preview.redd.it/ccyc61zvcvs21.jpg?width=640&crop=smart&auto=webp&s=f3b96072b5b67849f0faa07c191a015b64ed349d", "https://i.redd.it/czjwcdxkzrs21.jpg", "https://external-preview.redd.it/XkCp9wt6P5J2dFUW-0jgoLQw1NeWQoW5evtvgG5taa8.jpg?width=640&crop=smart&auto=webp&s=4d5906b8f4bdf832141033e52a497e2a698beb57", "https://preview.redd.it/qi9fxrcdjns21.jpg?width=640&crop=smart&auto=webp&s=3eafb8bd1d824e5243c7c69264ddc7737ca12ecc", "https://external-preview.redd.it/_X72wf9pb_g63dCpHObWNwCUSWIW5ntX2ZtcsHQgiy4.jpg?width=640&crop=smart&auto=webp&s=92a5b32a9d9cb30b10fd38968a3a0292a42cce96", "https://external-preview.redd.it/ggknmaj6B8I1173Atb2A9H1yrVv7Hk-w6TSKmHOEq0M.jpg?width=640&crop=smart&auto=webp&s=c3dab07239755268d65d45ad4c07b2ff1ced61e2", "https://external-preview.redd.it/NpKJBnHVPwNHclT282B6vXEjhTHNgTG1YhZ2KYJOCVY.jpg?width=640&crop=smart&auto=webp&s=83c07ac305c54aa94af2f31ad65231741a6c5015", "https://pbs.twimg.com/media/CHMECBUW8AAj37g?format=jpg&name=900x900", "https://pbs.twimg.com/media/CHA3rMjXEAIMOEQ?format=jpg&name=900x900", "https://cdn.discordapp.com/attachments/534417691344109578/565951299141632020/do-perky-little-butts-make-you-happy-jy2tg3J.jpg"];

    let result = Math.floor((Math.random() * replies.length));

    let pawgembed = new Discord.RichEmbed()
    .setTitle("Here! Take some ass! 🍑")
    .setColor(colour)
    .setFooter(`Requested by ${message.author.tag} 🍑`, message.author.avatarURL)
    .setImage(replies[result]);

    message.channel.send(pawgembed);


};

module.exports.help = {
    name: "ass"
}