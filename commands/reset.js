const Discord = require("discord.js")
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

exports.run = async (client, message, args, settings) => {

   
    if (!message.member.hasPermission('ADMINISTRATOR')) return

    let setting = args[0];

    const embed = `Successfully defaulted the ${setting}!`


    switch (setting) {
        case 'prefix': {
                try {
                    await client.updateGuild(message.guild, { prefix: "!" });
                    return message.channel.send(embed);
                
                } catch (error) {
                    console.error(error);
                    message.channel.send(`❯ An error occurred: **${error.message}** \`❌\``);
                }
            break;
        }
        case 'welcomeChannel': {
                try {
                    await client.updateGuild(message.guild, { welcomeChannel: "undefined" });
                    return message.channel.send(embed);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`❯ An error occurred: **${error.message}** \`❌\``)
                }
            break;
        }
        
        case 'loggingChannel': {
                try {
                    await client.updateGuild(message.guild, { loggingChannel: "undefined" });
                    return message.channel.send(embed);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`❯ An error occurred: **${error.message}** \`❌\``)
                }
            break;
        }
        case 'autoRole': {
                try {
                    await client.updateGuild(message.guild, { autoRole: "undefined" });
                    return message.channel.send(embed);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`❯ An error occurred: **${error.message}** \`❌\``)
                }
            break;
        }
        case 'leaveChannel': {
                try {
                    await client.updateGuild(message.guild, { leaveChannel: "undefined" });
                    return message.channel.send(embed);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`❯ An error occurred: **${error.message}** \`❌\``)
                } 
            break;
        }
        default: {
             const testaembed = new Discord.RichEmbed()
                .setColor(rcolour)
                .setDescription("❯ Please provide a setting to reset! `❌`")
                .addField("❯ Avaible Settings : ", "`loggingChannel`, `prefix`, `autoRole`, `welcomeChannel`, `leaveChannel`")
            message.channel.send(testaembed);
            break;
        }
    }
};

exports.config = {
    name: "reset",
    usage: "!reset <setting>",
    description: "Resets a setting!",
    accessableby: "Administrators"
}