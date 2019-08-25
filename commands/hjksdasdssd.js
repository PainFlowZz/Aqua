const search = require('yt-search');
 
module.exports.run = async (client, message, args, ops) => {
 
    search(args.join(' '), function (err, res) {
 
        if (err) return message.channel.send("Something wrent wrong.");
 
        var videos = res.videos.slice(0, 10);
 
        var response = '';
 
        for (var i in videos) {
 
            response += `**[${parseInt(i) + 1}]:** ${videos[i].title} \r\n`;
 
        }
 
        response += `Choose a number between 1 and ${videos.length}.`;

        message.channel.send(response);
 
        const filter = music => !isNaN(music.content) && music.content < videos.length + 1 && music.content > 0;
 
        const collection = message.channel.createMessageCollector(filter);
 
        collection.videos = videos;
 
        collection.once('collect', function (music) {
 
            var commandFile = require('./play.js');
 
            commandFile.run(client, message, [this.videos[parseInt(music.content) - 1].url], ops);
 
        });
 
    });
 
}
 
module.exports.help = {
    name: "hjksdasdssd"
}