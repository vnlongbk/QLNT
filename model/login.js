const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const loginSchema = mongoose.model('login', {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    token: String,
    dateCreated: Date,
    device: String
})

module.exports = loginSchema