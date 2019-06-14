module.exports = client => {
    console.log(`${client.user.username} is online`)

    setInterval(function() {
        client.user.setActivity("V3.2.9", {type: "STREAMING", url: "https://twitch.tv/drachenlord_offiziell_"});

    }, 10000)

};