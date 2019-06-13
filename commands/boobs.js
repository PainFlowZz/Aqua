const Discord = require("discord.js");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

exports.run = async (client, message, args) => {

    if (!message.channel.nsfw) return 
    
    let replies = ["https://cdn.boob.bot/boobs/80003547.gif", "https://pbs.twimg.com/media/CHBjJchWoAIDUri?format=jpg&name=small", "http://cdn.nudeteenslutties.com/thumbs/z/25215.jpg", "https://media.tits-guru.com/images/5a33096a-35b2-4abb-9976-31f9ed7b587c.jpeg", "https://pbs.twimg.com/media/DhAXOrxXUAIyRfB?format=jpg&name=medium", "https://pbs.twimg.com/media/CHEJC_-WoAEnsbZ?format=jpg&name=small", "https://cdn.boob.bot/pawg/5CBA.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/566753818872774656/2f6c623.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/566753818872774657/71e5785.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/566753817400573952/ab73ca5.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/565950858026549265/missed-me-R9YAr8x.jpg", "https://cdn.discordapp.com/attachments/534417691344109578/565950079324782592/it-s-my-cake-day-but-i-m-missing-some-frosting-can-someone-help-me-out-d-hWlpDjd.jpg", "http://nudebabes.realnakedgirls.net/wp-content/uploads/2018/06/pink-haired-washing-her-big-tits-250x446.jpg", "https://lovehomeporn.com/media/videos/tmb/80688/35.jpg", "https://www.porn18sex.com/uploads/1img_1456314682_255447.jpg", "https://www.bigtitsgallery.net/wp-content/uploads/2016/05/cum-covered-Shyla-Stylez.jpg", "", "https://pbs.twimg.com/media/CHGW9neXIAIF45E?format=jpg&name=small", "https://media.tits-guru.com/images/0728cb1d-f232-438c-8da0-7719e1d09117.jpeg", "http://nudebabes.realnakedgirls.net/wp-content/uploads/2018/03/rngnakedwhitebabe-1521678207lcp48-700x1102.jpg", "https://media.tits-guru.com/images/50faf403-aed7-4d7b-9960-128574333a60.jpeg", "https://pornedup.com/media/pics/nerdy-tits-selfie-10021.jpg", "http://i.imgur.com/Hpf1SFa.jpg", "https://media.tits-guru.com/images/bede6aa6-5141-4762-92e7-1d2dd75e3f7f.jpeg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6p55mRXGU160EQMIwItIIbfybkED25EGTOoC4oBAjzb-WHkcn"];

    let result = Math.floor((Math.random() * replies.length));

    let pawgembed = new Discord.RichEmbed()
    .setTitle("Here! Take some boobs! 🍒")
    .setColor(colour)
    .setFooter(`Requested by ${message.author.tag} 🍒`, message.author.avatarURL)
    .setImage(replies[result]);

    message.channel.send(pawgembed);

};

exports.help = {
    name: "boobs"
}