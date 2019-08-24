const Discord = require('discord.js');
const ms = require("ms");
const { colour } = require ("../colours.json");

exports.run = async (client, message, args, settings) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!user) return message.channel.send('Please provide a user!')
  if(user.id === message.author.id) return message.channel.send("Sorry, you can't mute yourself!")

  if (user.roles.find(x => x.name === "Muted")) return message.channel.send('The target is already muted!')

  let loggingChannel = message.guild.channels.get(settings.loggingChannel)

  let mutetime = args.slice(2).join(" ");

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

  let reason = args[1];
  if(!reason) return message.channel.send('Please specify a reason.');
   
  const embed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`➜ **Moderator:** ${message.author} (${message.author.id}) \n ➜ **Target:** ${message.mentions.users.first()} (${user.id}) \n ➜ **Action:** Tempute \n ➜ **Mutetime:** ${mutetime} \n ➜ **Reason:** ${reason}` )
   
  const embedwithouttime = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`➜ **Moderator:** ${message.author} (${message.author.id}) \n ➜ **Target:** ${message.mentions.users.first()} (${user.id}) \n ➜ **Action:** Mute \n ➜ **Reason:** ${reason}` )
   
  message.channel.send(`Successfully muted ${user} for ${mutetime}!`)

  if (ms(mutetime)) {
    await user.roles.add(role)

    message.channel.send(`Successfully muted ${user} for ${mutetime}.`);
  
    if(settings.loggingChannel !== "none") loggingChannel.send(embed)

    setTimeout(function () {

      user.roles.remove(role)
      
      message.channel.send(`Successfully unmuted ${user}.`)
    }, ms(time));

  } else{
    user.roles.add(role)
    
    message.channel.send(`Successfully muted ${user}.`)
    
    loggingChannel.send(embedwithouttime)
  }

}

exports.config = {
  name: "mute",
  usage: "!mute <@user> <reason> [<mutetime>]",
  description: "Mutes a user."
}