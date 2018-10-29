const mongoose = require('mongoose')
const schema = mongoose.Schema;

const voteSchema = new schema({
    os: { type: String, required: true },
    points: { type: String, required: true }
})

const Vote = mongoose.model('vote', voteSchema)
module.exports = Vote