const BaseController = require('./base')
const Model = require('../model/room')


class RoomController extends BaseController {
    constructor(Model) {
        super(Model)
        this.fields = [
            'inn',
            'roomNumber',
            'roomPrice',
            'status'
        ]
        this.requiredFields = [
            'inn',
            'roomNumber',
            'roomPrice',
            'status'
        ]
    }
}


module.exports = new RoomController(Model)