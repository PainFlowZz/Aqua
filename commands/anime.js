const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

exports.run = async (client, message, args) => {

    if (!message.channel.nsfw) return 
    
    let replies = ["https://cdn.nekos.life/v3/nsfw/img/blowjob_lewd/blowjob_001.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/567274903213047809/1555274819077791353172958253620.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/567274903993057280/15552747869345213163563940014344.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/567274902407872532/15552747752092242213091208971966.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/567087014709559327/15552183537415826845839535288885.gif", "https://cdn.discordapp.com/attachments/534417691344109578/567087012134387741/15552181282915363782631372947476.gif", "https://cdn.discordapp.com/attachments/534417691344109578/566667227189870611/original_drawn_by_sousouman__bd4d24834e2a3c6b9f24a615417709ca.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/566667220214743040/90df8e6334b26f6f51c92d76c0d79624.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/566667218843074562/original_drawn_by_karutamo__1f2bea9cb02471dfd253f85c7f08a482.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/566555895321067520/n0fvmcmsxqr21.png", "https://cdn.discordapp.com/attachments/534417691344109578/566319372486836226/a65d998a4ae3ecd6442c2fed36fb807d.jpeg", "https://cdn.discordapp.com/attachments/534417691344109578/566319371744575546/sample_71c13cd820773104a119561fcc195ca0aafd841e.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/566319372486836224/sample_eb14ee4a509d87a0aa532b67b26d6e512ef39f5f.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/566319371740381248/f31517b0c1f4b8279041860795e8175a.jpeg", "https://cdn.discordapp.com/attachments/534417691344109578/566318369758773255/7423790d631c53e5f80414728944e16d.png", "https://cdn.discordapp.com/attachments/534417691344109578/565975348282392597/15549684213703577949109361701501.gif", "https://cdn.discordapp.com/attachments/534417691344109578/565975346600738858/1554968713404634772000962495622.gif", "https://cdn.discordapp.com/attachments/534417691344109578/565975345686118420/15549687728821638379228715816482.gif", "https://cdn.nekos.life/v3/nsfw/img/classic_lewd/classic_038.jpg", ""]
    let result = Math.floor((Math.random() * replies.length));

    let pawgembed = new Discord.RichEmbed()
    .setTitle("Here! Take some anime!")
    .setColor(colour)
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
    .setImage(replies[result]);

    message.channel.send(pawgembed);

};

exports.help = {
    name: "anime"
}