module.exports = async (client, message, user) => {


    if (!message.guild) return;

    let settings;
    try {
        settings = await client.getGuild(message.guild);
    } catch (error) {
        console.error(error);
    }

    if (message.author.bot) return;

    const messageCheck = Math.floor((Math.random() * 10)) + 1;
    const coinAmount = Math.floor((Math.random() * 25)) + 1;
    const xpAmount = Math.floor((Math.random() * 30)) + 1;

    if (messageCheck >= 2 && messageCheck <= 5) {
        try {
            await updateCoins(client, message.member, coinAmount);
        } catch (err) {
            console.error(err);
        }
    }
    if (messageCheck >= 2 && messageCheck <= 5) {
        try {
            await updateXp(client, message.member, xpAmount);
        } catch (err) {
            console.error(err);
        }
    }
    
    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (!cmd) return;

    cmd.run(client, message, args, settings);
};

async function updateCoins(client, member, amount) {
    const newProfile = {
        guildID: member.guild.id,
        guildName: member.guild.name,
        userID: member.id,
        username: member.user.tag
    };

    const profile = await client.getProfile(member);
    if (!profile) await client.createProfile(newProfile);
    const newAmount = profile ? profile.coins + amount : amount;
    await client.updateProfile(member, { coins: newAmount });
}

async function updateXp(client, member, amount) {

    const profile = await client.getProfile(member);
    const newAmount = profile ? profile.xp + amount : amount;
    await client.updateProfile(member, { xp: newAmount });
}