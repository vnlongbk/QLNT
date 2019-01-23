const BaseController = require('./base')
const Model = require('../model/inn')


class InnController extends BaseController {
    constructor(Model) {
        super(Model)
        this.fields = [
            'name',
            'owner',
            'address',
            'phoneNumber',
            'electricPrice',
            'waterPrice',
            'trashPrice'
        ]
        this.requiredFields = ['owner']
    }
}


module.exports = new InnController(Model)