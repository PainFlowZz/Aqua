module.exports = client => {
    console.log(`${client.user.username} is online`)

    setInterval(function() {
        client.user.setActivity("!help", {type: "WATCHING", url: "https://twitch.tv/drachenlord_offiziell_"});

    }, 10000)

};