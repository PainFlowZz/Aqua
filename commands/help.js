const Discord = require("discord.js")
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
exports.run = async (client, message, args, settings) => {

    let setting = args[0];
    let updated = args.slice(1).join(' ');

    const embed = new Discord.RichEmbed()
    .setAuthor("Yuki's Commands list")
    .setColor(colour)
    .addField("`💰` ❯ Economy", "`" + settings.prefix + "help economy`", true)
    .addField("`🔨` ❯ Moderation:", "`" + settings.prefix + "help moderation`", true) 
    .addField("`🛠️` ❯ Utility:", "`" + settings.prefix + "help utilities`", true)      
    .addField("`🎹` ❯ Music:", "`" + settings.prefix + "help music`",true)  
    .addField("`🔞` ❯ NSFW:", "`" + settings.prefix + "help nsfw`", true)
    .addField("`🎨` ❯ Fun:", "`" + settings.prefix + "help fun`", true)   
    .addField("`👑` ❯ Owner:", "`" + settings.prefix + "help owner`", true)
    .addField("`❔` ❯ Other :", "`" + settings.prefix + "help other`", true) 
    .addBlankField(true)
    .setFooter("Owner: pain.exe#0001. If you have any issues or if you found a bug, Please DM pain.exe#0001")

    const embed2 = new Discord.RichEmbed()
    .setColor(colour)
    .setDescription(":mailbox_with_mail:  | Check your DMs!")

    const eembed = new Discord.RichEmbed()
    .setColor(colour)
    .setAuthor("❯ Economy Commands", message.guild.iconURL)
    .addField("❯ `Command`", "**" + settings.prefix + "coins <@user> \n "+ settings.prefix + "profile <@user>  \n " + settings.prefix + "xp <@user> **", true)
    .addField("\n ❯ `Description`", "**Shows the coins of a user. \n Shows a users profile. \n Shows the xp of a user.**", true)


    const membed = new Discord.RichEmbed()
    .setColor(colour)
    .setAuthor("❯ Moderation Commands", message.guild.iconURL)
    .addField("❯ `Command`", "**" + settings.prefix + "addrole <@user> <@role> \n " + settings.prefix + "ban <@user> <reason> \n " + settings.prefix + "clear \n " + settings.prefix + "config \n " + settings.prefix + "kick <@user> <reason> \n " + settings.prefix + "mute @<user> <reason> \n " + settings.prefix + "removeRole <@user> <@role> \n " + settings.prefix + "reset <setting> \n " + settings.prefix + "setconfig <setting> <value> \n " + settings.prefix + "tempmute <@user> <time> <reason> \n " + settings.prefix + "unban <userid> <reason> \n " + settings.prefix + "unmute <@user> <reason>**", true)
    .addField("\n ❯ `Description`", "**Add a role to a user. \n Ban a user. \n Deletes Messages. \n See the config of the Server. \n Kick a user. \n Mute a user. \n Remove a role from a user. \n Resets a setting. \n Sets the config. \n Mute a user temporaily. \n Unban a user. \n Unmute a user.**", true)


    const nembed = new Discord.RichEmbed()
    .setColor(colour)
    .setAuthor("❯ NSFW Commands", message.guild.iconURL)
    .addField("❯ `Command`", "**" + settings.prefix + "anime \n " + settings.prefix + "ass \n " + settings.prefix + "boobs \n " + settings.prefix + "gif**", true)
    .addField("\n ❯ `Description`", "**Sends a random anime nsfw picutre. \n Sends a random ass nsfw picture. \n Sends a random boobs nsfw picture. \n Sends a random nsfw gif.**", true)

    const mmembed = new Discord.RichEmbed()
    .setColor(colour)
    .setAuthor("❯ Music Commands", message.guild.iconURL)
    .addField("❯ `Command`", "**!np \n " + settings.prefix + "play <search / URL> \n " + settings.prefix + "queue \n " + settings.prefix + "resume \n " + settings.prefix + "stop \n " + settings.prefix + "vol <value>**", true)
    .addField("\n ❯ `Description`", "**See the current playing song. \n Adds a song to the queue. \n Shows the queue. \n Resumes the queue. \n Stops the queue. \n Changes the volume.**", true)


    const oembed = new Discord.RichEmbed()
    .setColor(colour)
    .setAuthor("❯ Owner Commands", message.guild.iconURL)
    .addField("❯ `Command`", "**" + settings.prefix + "eval \n " + settings.prefix + "setactivity <activity>**", true)
    .addField("\n ❯ `Description`", "**Evals a JavaScript Code. \n  Sets the bots activity**", true)


    const funembed = new Discord.RichEmbed()
    .setColor(colour)
    .setAuthor("❯ Fun Commands", message.guild.iconURL)
    .addField("❯ `Command`", "**" + settings.prefix + "doggo \n " + settings.prefix + "female \n " + settings.prefix + "jaegermeister \n " + settings.prefix + "kiss <@user> \n " + settings.prefix + "male \n " + settings.prefix + "meme \n " + settings.prefix + "meow \n " + settings.prefix + "say <message> \n " + settings.prefix + "transgender \n " + settings.prefix + "weather <location> **", true)
    .addField("\n ❯ `Description`", "**Sends a dog picture. \n  Gives you the female role.\nSends some jaegermeister vibes. \n Kisses a user. \n Gives you the male role. \n Sends a meme. \n Sends a cat picture. \n Lets Yuki say something. \n Changes your gender role. \n Shows the weather. **", true)


    const utilembed = new Discord.RichEmbed()
    .setColor(colour)
    .setAuthor("❯ Utilities Commands", message.guild.iconURL)
    .addField("❯ `Command`", "**" + settings.prefix + "avatar <@user> \n " + settings.prefix + "botinfo \n " + settings.prefix + "help \n " + settings.prefix + "ping \n " + settings.prefix + "serverinfo \n " + settings.prefix + "uptime**", true)
    .addField("\n ❯ `Description`", "**Sends a users avatar. \n  Gives you help. \n Shows you your ping. \n Shows information about the server. \n Shows information about the bot. \n Shows how long the bot has been running.**", true)


    const otherembed = new Discord.RichEmbed()
    .setColor(colour)
    .setAuthor("❯ Other Commands", message.guild.iconURL)
    .addField("❯ `Command`", "**" + settings.prefix + "invite \n "+ settings.prefix + "invites \n " + settings.prefix + "paste \n" + settings.prefix + "vote**", true)
    .addField("\n ❯ `Description`", "**See the invite links. \n Shows the invite leaderboard. \n Shows websites for pasting your code. \n Link for voting on discordbots.org!**", true)


    switch (setting) {
        case 'economy': {
            message.channel.send(embed2).then(message => {message.delete(8000)});
            message.author.send(eembed);
            break;        
        }



        case 'moderation': {
            message.channel.send(embed2).then(message => {message.delete(8000)});
            message.author.send(membed);
            break;
        }

        case 'music': {
            message.channel.send(embed2).then(message => {message.delete(8000)});
            message.author.send(mmembed);
            break;
        }
    
        case 'nsfw': {
            message.channel.send(embed2).then(message => {message.delete(8000)});
            message.author.send(nembed);
            break;
        }

        case 'owner': {
            message.channel.send(embed2).then(message => {message.delete(8000)});
            message.author.send(oembed);
            break;
        }

        case 'fun': {
            message.channel.send(embed2).then(message => {message.delete(8000)});
            message.author.send(funembed);
            break;
        }

        case 'utilities': {
            message.channel.send(embed2).then(message => {message.delete(8000)});
            message.author.send(utilembed);
            break;
        }
      
        case 'other': {
            message.channel.send(embed2).then(message => {message.delete(8000)});
            message.author.send(otherembed);
            break;
        }

        default: {

            message.channel.send(embed).then(message => {message.delete(20000)});
            break;
        }
    }
};

exports.help = {
    name: 'help'
};
