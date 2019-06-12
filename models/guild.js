const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    ownerID: String,
    ownerUsername: String,
    prefix: String,
    welcomeChannel: String,
    leaveChannel: String,
    modRole: String,
    adminRole: String,
    loggingChannel: String,
    autoRole: String
});

module.exports = mongoose.model('Guild', guildSchema);