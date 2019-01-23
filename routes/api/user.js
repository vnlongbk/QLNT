const express = require('express');
const router = express.Router();
const SuperRouter = require('../superRouter')
const userController = require('../../controllers/user')
const authService = require('../../services/auth')
const Inn = require('../../model/inn')

const authMiddleware = require('../../middleware/auth')

class UserRouter extends SuperRouter {
    constructor(controller) {
        super(controller)
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await userController.getOne({ username })
            if (!user) {
                throw new Error()
            }
            req.body.password = authService.sha512(req.body.password, '123')
            if (req.body.password !== user.password) {
                throw new Error()
            }
            let _token = {}
            if (user.role === 'MOD') {
                const owner = await Inn.findOne({ owner: user._id })
                _token = {
                    _id: user._id,
                    date: new Date().getTime(),
                    role: user.role,
                    innID: owner._id
                }
            } else {
                _token = {
                    _id: user._id,
                    date: new Date().getTime(),
                    role: user.role
                }
            }
            const token = await authService.encrypt(JSON.stringify(_token))
            res.json({
                token,
                username: user.username,
                role: user.role,
                message: 'Đăng nhập thành công'
            })
        } catch (error) {
            console.log(error)
            res.json({
                result: false,
                message: 'Username hoặc password không chính xác.'
            })
        }
    }
    
    async signup(req, res) {
        try {
            let { name, username, password } = req.body
            let user = await userController.getOne({ username })
            if (user) {
                return res.json({
                    result: false,
                    message: 'Username đã tồn tại'
                })
            }

            password = authService.sha512(password, '123')

            user = await userController.add({
                name, username, password
            })

            const token = authService.encrypt(JSON.stringify({
                _id: user._id,
                date: new Date().getTime(),
                role: user.role
            }));

            res.json({
                token,
                username: user.username,
                message: 'Đăng ký thành công'
            })
        } catch (error) {
            res.json({
                result: false,
                message: 'Lỗi server'
            })
        }
    }
}
const user = new UserRouter(userController)


router.post('/login', user.login)
router.post('/signup', user.signup)

router.use(authMiddleware(['ADMIN', 'SUPERADMIN']))

router.post('/', user.add)
router.get('/:id', user.getOne)
router.get('/', user.getAll)
router.put('/:id', user.edit)
router.delete('/:id', user.delete)


module.exports = router