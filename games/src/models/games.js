const mongoose = require("mongoose")

const gameShema = new mongoose.Schema({
    id: {type: Number},
    title: {type: String},
    launchYear: {type: String},
    consoles: {type: Array},
    liked: {type: Boolean},
    stages: {type: Array}
}, {
    versionKey: false
})

const gamers = mongoose.model('games', gameShema)

module.exports = gamers