const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BillSchema = mongoose.model('bill', {
    idOldMonthly: {
        type: Schema.Types.ObjectId,
        ref: 'roomMonthly'
    },
    idNewMonthly: {
        type: Schema.Types.ObjectId,
        ref: 'roomMonthly'
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room'
    },
    month: Number,
    year: Number,
    electricPrice:Number,
    waterPrice: Number,
    internetPrice: Number,
    trashPrice: Number,
    tvPrice: Number,
    total: Number,
    dept: [{
          monney: {
            type: Number,
            default: 0
          }
        }, {
          decription: {
            type: String
          }
        }
    ],
    paid: Number,
    statusInfo: {
        type: String,
        enum: ['MISSING_INFO', 'UNCHECK', 'CHECKED'],
        default: 'MISSING_INFO'
    },
    statusPaid: {
        type: String,
        enum: ['NOT_PAID', 'PAIDED'],
        default: 'NOT_PAID'
    }
})

module.exports = BillSchema