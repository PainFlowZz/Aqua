const Discord = require("discord.js")
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

let wcembed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please specify a valid channel! \`❌\`")

let wcemsbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please specify a role! \`❌\`")

let pembed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please specify a prefix! \`❌\`")  

exports.run = async (client, message, args) => {

    const MissingPermissionEmbed = new Discord.RichEmbed()
    .setColor(rcolour)
    .setDescription("❯ Missing permission : `ADMINISTRATOR` `❌`")
    
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(MissingPermissionEmbed)

    let setting = args[0];
    let updated = args.slice(1).join(' ');

    const embed = new Discord.RichEmbed()
    .setColor(colour)
    .setDescription("❯ The `" + setting + "` of this server has been set to " + updated + " ! `✔️`")

    switch (setting) {
        case 'prefix': {
            if (updated) {
                try {
                    let log2 = args[1]
                    if (!log2) return message.channel.send(pembed)
                    await client.updateGuild(message.guild, { prefix: updated });
                    return message.channel.send(embed);
                
                } catch (error) {
                    console.error(error);
                    message.channel.send(`❯ An error occurred: **${error.message}** \`❌\``);
                }
            }

            break;
        }
        case 'welcomeChannel': {
            if (updated) {
                try {
                    let log2 = message.mentions.channels.first().id
                    if (!log2) return message.channel.send(wcembed)
                    await client.updateGuild(message.guild, { welcomeChannel: log2 });
                    return message.channel.send(embed);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`❯ An error occurred: **${error.message}** \`❌\``)
                }
            }

            break;
        }
        
        case 'loggingChannel': {
            if (updated) {
                try {
                    let log2 = message.mentions.channels.first().id
                    if (!log2) return message.channel.send(wcembed)
                    await client.updateGuild(message.guild, { loggingChannel: log2 });
                    return message.channel.send(embed);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`❯ An error occurred: **${error.message}** \`❌\``)
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
                    return message.channel.send(embed);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`❯ An error occurred: **${error.message}** \`❌\``)
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
                    return message.channel.send(embed);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`❯ An error occurred: **${error.message}** \`❌\``)
                }
            }
            break;
        }
        default: {
             const testaembed = new Discord.RichEmbed()
                .setColor(rcolour)
                .setDescription("❯ Please provide a setting to change! `❌`")
                .addField("❯ Avaible Settings : ", "`loggingChannel`, `prefix`, `autoRole`, `welcomeChannel`, `leaveChannel`")
            message.channel.send(testaembed);
            break;
        }
    }
};

exports.help = {
    name: 'setconfig'
}