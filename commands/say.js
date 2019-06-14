exports.run = (client, message, args) => {

    const response = args.join(' ');
    message.delete();
    message.channel.send(response);

};

exports.config = {
    name: "say",
    usage: "!say <text>",
    description: "Lets <none> says something!",
    accessableby: "Everyone"
}