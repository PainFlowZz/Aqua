const Discord = require('discord.js');
const ms = require("ms");
const { colour } = require ("../colours.json");
const { rcolour } = require ("../colours.json");

const NoUserEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please specify a `user`! `❌`")

const NoLogChannel = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please create a log channel! `❌`")

const UserAuthorEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ You can't mute yourself! `❌`")

const NoTimeEmbed = new Discord.RichEmbed()
.setColor(rcolour)
.setDescription("❯ Please specify a `time`! `❌`")

const AlreadyMutedEmbed = new Discord.RichEmbed()
.setColor(colour)
.setDescription("❯ This user is already muted! `❌`")

exports.run = async (client, message, args, settings) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!user) return message.channel.send(NoUserEmbed)
  if(user.id === message.author.id) return message.channel.send(UserAuthorEmbed)

  if (user.roles.find(x => x.name === "Muted")) return message.channel.send(AlreadyMutedEmbed)

  let log = message.guild.channels.get(settings.loggingChannel)
  if(!log) return message.channel.send(NoLogChannel)

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
  if(!mutetime) return message.channel.send(NoTimeEmbed);

  await user.addRole(role);
     
  const LogEmbed = new Discord.RichEmbed()
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setColor(colour)
  .setDescription(`❯ **Victim:** <@${user.id}> (${user.id}) \n ❯ **Action:** Tempmute \n ❯ **Time:** ${mutetime} \n❯ **Reason:** ${reason}`)
  .setFooter(message.guild.name, message.guild.iconURL)
  .setTimestamp()
    
  log.send(LogEmbed)
  
  const TempMutedEmbed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription("<@"+user.id +">" + " has been temporarily muted for " + "`"+ mutetime +"`" + " `✔️`")
  
  message.channel.send(TempMutedEmbed)

  setTimeout(function(){
    user.removeRole(role.id);
    
    let UnmutedConfirmEmbed = new Discord.RichEmbed()
    .setColor(colour)
    .setDescription("<@"+user.id+">" + " has been unmuted!" + " `✔️`")
    
    message.channel.send(UnmutedConfirmEmbed);
  }, ms(mutetime));
}

exports.help = {
  name: "tempmute"
}