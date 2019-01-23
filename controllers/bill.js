const BaseController = require('./base')
const Model = require('../model/bill')


class BillController extends BaseController {
    constructor(Model) {
        super(Model)
        this.fields = [
            'idOldMonthly',
            'idNewMonthly',
            'room',
            'month',
            'year',
            'electricPrice',
            'waterPrice',
            'internetPrice',
            'tvPrice',
            'trashPrice',
            'total',
            'dept',
            'paid',
            'statusPaid'
        ]
        this.requiredFields = [
            'idOldMonthly',
            'idNewMonthly',
            'room',
            'month',
            'year',
            'electric',
            'water',
            'internet',
        ]
        this.relationFields = [
            'room',
            'idOldMonthly',
            'idNewMonthly',
        ]
    }
}


module.exports = new BillController(Model)