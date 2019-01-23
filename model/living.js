const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('living', {
    inn: {
        type: Schema.Types.ObjectId,
        ref: 'inn'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room'
    },
    startDate: Date,
    endDate: Date
});
