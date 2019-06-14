module.exports.run = async (bot, message, args) => {  
  const deleteCount = parseInt(args[0], 10);
    
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return
    
  if (args > 100) return message.channel.send('Please provide a number between 1 and 100!')
    
  if(!deleteCount) return message.channel.send('Please only use numbers as your argument!')
    
  const fetched = await message.channel.fetchMessages({limit: deleteCount});
  message.channel.bulkDelete(fetched)

}  

exports.config = {
  name: "clear",
  usage: "!clear <1-100>",
  description: "Deletes messages!",
  accessableby: "Moderators"
}