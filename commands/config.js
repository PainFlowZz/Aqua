const Discord = require("discord.js")
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");
module.exports.run = async (client, message, args, settings) => {

    let emoji = message.guild.emojis.find(x => x.name === "aqua_why");

    let welcomeChannel = message.guild.channels.get(settings.welcomeChannel)
    let leaveChannel = message.guild.channels.get(settings.leaveChannel)
    let loggingChannel = message.guild.channels.get(settings.loggingChannel)
    let autoRole = message.guild.roles.get(settings.autoRole)

    if (welcomeChannel === undefined)  welcomeChannel = "None";
    if (loggingChannel === undefined)  loggingChannel = "None";
    if (autoRole === undefined)  autoRole = "None";
    if (leaveChannel === undefined) leaveChannel = "None";
    
    const dembed = new Discord.RichEmbed()
    .setTitle(emoji + " Configuration!")
    .setColor(colour)
    .addField("__**Prefix**__","**" + settings.prefix + "`config prefix [ prefix ]`" + "\n ➜ Current: **"+ settings.prefix)
    .addField("__**Welcome Channel**__","**" + settings.prefix + "`config welchomeChannel [ #channel | none ]`" + "\n ➜ Current: **"+ welcomeChannel)
    .addField("__**Leave Channel**__","**" + settings.prefix + "`config leaveChannel [ #channel | none ]`" + "\n ➜ Current: **"+ leaveChannel)
    .addField("__**Log Channel**__","**" + settings.prefix + "`config logChannel [ #channel | none ]`" + "\n ➜ Current: **"+ loggingChannel)
    .addField("__**Role On Join**__","**" + settings.prefix + "`config autoRole [ @role | none ]`" + "\n ➜ Current: **"+ autoRole)

    //message.channel.send(embed);   


    let setting = args[0];
    let updated = args.slice(1).join(' ');

    switch (setting) {
        case 'prefix': {
            if (updated) {
                try {
                    await client.updateGuild(message.guild, { prefix: updated });
                    return message.channel.send(`Successfully set the prefix to ${updated}`);
                
                } catch (error) {
                    console.error(error);
                    message.channel.send(`Error: **${error.message}**`);
                }
            }

            break;
        }
        case 'welcomeChannel': {
            if (updated) {
                try {    
                    if (updated === "none") return (client.updateGuild(message.guild, { welcomeChannel: "none" }) && (message.channel.send("Successfully set the welcome channel to none")))
                    let channel = message.guild.channels.find(c => c.name === updated) || message.mentions.channels.first();
                    if (!channel) return message.channel.send("Please specify a valid channel.")
                    await client.updateGuild(message.guild, { welcomeChannel: channel.id });
                    return message.channel.send(`Successfully set the welcome channel to ${updated}`);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`Error: **${error.message}**`);
                }
            }

            break;
        }
        
        case 'loggingChannel': {
            if (updated) {
                try {
                    let channel = message.guild.channels.find(c => c.name === updated) || message.mentions.channels.first();
                    if (!channel) return message.channel.send("Please specify a valid channel.")
                    await client.updateGuild(message.guild, { loggingChannel: channel.id });
                    return message.channel.send(`Successfully set the logging channel to ${updated}`);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`Error: **${error.message}**`);
                }
            }

            break;
        }
        case 'autoRole': {
            if (updated) {
                try {
                    let roj2 = message.mentions.roles.first().id
                    if (!roj2) return message.channel.send(wcemsbed)
                    await client.updateGuild(message.guild, { autoRole: roj2 });
                    return message.channel.send(`Successfully set the auto role to ${updated}`);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`Error: **${error.message}**`);
                }
            }
            break;
        }
        case 'leaveChannel': {
            if (updated) {
                try {
                    let log2 = message.mentions.channels.first().id
                    if (!log2) return message.channel.send(wcembed)
                    await client.updateGuild(message.guild, { leaveChannel: log2 });
                    return message.channel.send(`Successfully set the leave channel to ${updated}`);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`Error: **${error.message}**`);
                }
            }
            break;
        }
        default: {
            
            message.channel.send(dembed);
            break;
        }
    }

};

exports.config = {
    name: "config",
    usage: "!config",
    description: "Shows the config!",
    accessableby: "Everyone"
};