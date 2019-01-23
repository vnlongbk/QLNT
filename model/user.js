const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = mongoose.model('user', {
    name: String,
    username: String,
    email: String,
    password: String,
    sex: Boolean,
    phone: String,
    cmnd: String,
    birth: Date,
    hometown: String,
    role: {
        type: String,
        enum: ['USER', 'MOD', 'ADMIN', 'SUPERADMIN'],
        default: 'USER'
    },
    dateCreated: Date,
    avatar: String,
})

module.exports = UserSchema