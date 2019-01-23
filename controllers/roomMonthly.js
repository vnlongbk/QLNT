const BaseController = require('./base')
const Model = require('../model/roomMonthly')


class RoomController extends BaseController {
    constructor(Model) {
        super(Model)
        this.fields = [
            'room',
            'month',
            'year',
            'electric',
            'water',
            'internet',
            'tv',
            'trash',
        ]
        this.requiredFields = [
            'room',
            'month',
            'year',
            'electric',
            'water',
            'internet',
        ]
    }
}


module.exports = new RoomController(Model)