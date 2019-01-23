const BaseController = require('./base')
const UserModel = require('../model/user')


class UserController extends BaseController {
    constructor(Model) {
        super(Model)
        this.fields = [
            'name',
            'email',
            'username',
            'password',
            'sex',
            'phone',
            'cmnd',
            'birth',
            'avatar',
            'hometown',
            'cmnd',
            'role'
        ]
        this.requiredFields = ['username', 'password']
    }
}


module.exports = new UserController(UserModel)