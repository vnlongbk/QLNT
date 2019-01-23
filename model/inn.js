const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('inn', {
    name: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    address: String,
    phoneNumber: String,
    electricPrice: Number,
    waterPrice: Number,
    trashPrice: Number
});
