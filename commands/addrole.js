const Discord = require("discord.js");
const { colour } = require ("../colours.json");

exports.run = async (client, message, args, settings) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return
  
  let logs = message.guild.channels.get(settings.loggingChannel);
    
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let guild = client.guilds.get(message.guild.id)
  if(!rMember) return message.channel.send('Please provide a user!');
  
  USER_ID = rMember;

  if (!guild.member(USER_ID)) return message.channel.send('Please provide a valid user!')
  
  let role = message.mentions.roles.first()
  if(!role) return message.channel.send('Please provide a role!');

  if(rMember.roles.has(role.id)) return message.channel.send('The target already has the ' + role + 'role.');
  await(rMember.addRole(role.id));

  const embed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`❯ **Moderator:** ${message.author} (${message.author.id}) \n ❯ **Target:** ${message.mentions.users.first()} (${rMember.id}) \n ❯ **Action:** Addrole \n ❯ **Role:** ${role}`)
  .setFooter('Server: ' + message.guild.name, message.guild.iconURL)
  .setTimestamp()

  message.channel.send(`Successfully added the specified role to ${rMember}!`)
  
  try {
    logs.send(embed)
  } catch (e) {
    return 
  }

}

exports.config = {
  name: "addrole",
  usage: "!addrole <@user> <@role>",
  description: "Gives a user a role!",
  accessableby: "Administrators"
}