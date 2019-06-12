module.exports = client => {
    console.log(`${client.user.username} is online`)

    let statuses = [
        `${client.guilds.size} servers!`,
        "!help",
        `over ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users!`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "WATCHING", url: "https://twitch.tv/none"});

    }, 15000)

};