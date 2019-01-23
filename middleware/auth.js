const authService = require('../services/auth')
const userController = require('../controllers/user')

const checkUserMiddleware = (roles = []) => async (req, res, next) => {
  const _token = (req.headers['authorization'])
  try {
    if (!_token) {
      throw new Error();
    }
    const { _id, date, role } = JSON.parse(authService.decrypt(_token))
    
    if (!roles.includes(role)) {
      throw new Error();
    }
    
    const user = await userController.getOne({ _id: _id })
    if (!user) {
      throw new Error();
    }

    req.user = user
    return next()
  } catch (error) {
    return res.json({
      result: false,
      message: 'Lỗi xác thực.'
    })
  }
  
}

module.exports = checkUserMiddleware