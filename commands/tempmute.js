const Discord = require('discord.js');
const ms = require("ms");
const { colour } = require ("../colours.json");


exports.run = async (client, message, args, settings) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!user) return message.channel.send('Please provide a user!')
  if(user.id === message.author.id) return message.channel.send("Sorry, you can't mute yourself!")

  if (user.roles.find(x => x.name === "Muted")) return message.channel.send('The target is already muted!')

  let log = message.guild.channels.get(settings.loggingChannel)

  let reason = args.slice(2).join(" ");
  if(!reason) reason = "No reason given."

  let role = message.guild.roles.find(r => r.name === "Muted");
  if(!role) {
      try {
          role = await message.guild.createRole({
              name: "Muted",
              color: "#0000000",
              permissions: []
          });
        
          message.guild.channels.forEach(async (channel,id) => {
              await channel.overwritePermissions(role, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false
              });
          });
        
      } catch (e) {
          console.log(e.stack);
      }
  }

  let mutetime = args[1];
  if(!mutetime) return message.channel.send('Please provide the mutetime!');

  await user.addRole(role);
     
  const embed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`❯ **Moderator:** ${message.author} (${message.author.id}) \n ❯ **Target:** ${message.mentions.users.first()} (${user.id}) \n ❯ **Action:** Tempute \n ❯ **Mutetime:** ${mutetime} \n ❯ **Reason:** ${reason}` )
  .setFooter('Server: ' + message.guild.name, message.guild.iconURL)
  .setTimestamp()
  
  try {
    log.send(embed)
  } catch (e) {
    return 
  }
  
  message.channel.send(`Successfully muted ${user} for ${mutetime}!`)

  setTimeout(function(){
    user.removeRole(role.id);
     
    message.channel.send(`Successfully unmuted ${user}!`);
  }, ms(mutetime));
}

exports.config = {
  name: "tempmute",
  usage: "!tempmute <@user> <mutetime> [<reason>]",
  description: "Mutes a user temporarily."
}