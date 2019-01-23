const BaseController = require('./base')
const Model = require('../model/living')


class LivingController extends BaseController {
    constructor(Model) {
        super(Model)
        this.fields = [
            'inn',
            'user',
            'room',
            'startDate',
            'endDate'
        ]
        this.requiredFields = [
            'inn',
            'user',
            'room',
            'startDate'
        ]
        this.relationFields = [
            'room',
            'user',
            'inn'
        ]
    }
}


module.exports = new LivingController(Model)