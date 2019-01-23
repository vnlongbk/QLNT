const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RoomSchema = mongoose.model('room', {
    inn: {
        type: Schema.Types.ObjectId,
        ref: 'inn'
    },
    roomNumber: String,
    roomPrice: Number,
    status: {
        type: String,
        enum: ['AVAILABLE', 'UNAVAILABLE'],
        default: 'AVAILABLE'
    }
})

module.exports = RoomSchema