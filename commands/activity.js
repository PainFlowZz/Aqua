exports.run = async (bot, message, args) => {
    let status = args.join(' ')
    if(!status) return message.channel.send('Please provide a activity!')

    if(!message.author.id === "328448086412230658") return

    bot.user.setActivity(status)
}

exports.config = {
    name: "activity",
    usage: "!activity <text>",
    description: "Changes the activity of the Bot!",
    accessableby: "Bot Owner"
}