const Base = require('./base')
const Login = require('../model/login')

class LoginController extends Base {
    constructor(Model) {
        super(Model)
        this.fields = [
            'user',
            'token',
            'createdDate',
            'device'
        ]
        this.requiredFields = ['user',
            'token',
            'createdDate',
            'device'
        ]
    }
}

module.exports = new LoginController(Login)