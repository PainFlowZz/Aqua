exports.run = async (bot, message) => {

    message.channel.send(`Loading...`).then(message =>{

        message.edit(`pong! **\`${bot.pings[0]}ms\`**`)
    })

}

exports.config = {
    name: "ping",
    usage: "!ping",
    description: "Displays your ping."
}