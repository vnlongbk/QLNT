const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RoomMonthlySchema = mongoose.model('roomMonthly', {
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room'
    },
    month: Number,
    year: Number,
    electric: Number,
    water: Number,
    internet: Number,
    tv: Boolean,
    trash: Boolean,
})

module.exports = RoomMonthlySchema