const express = require('express');
const router = express.Router();
const roomRouter = require('./api/room')
const userRouter = require('./api/user')
const roomMonthlyRouter = require('./api/roomMonthly')
const billRouter = require('./api/bill')
const dashboardRouter = require('./api/dashboard')
const livingRouter = require('./api/living')
const authMiddleware = require('../middleware/auth')



router.use('/room', authMiddleware(['ADMIN', 'SUPERADMIN']), roomRouter)
router.use('/user', userRouter)
router.use('/room-monthly', authMiddleware(['ADMIN', 'SUPERADMIN']), roomMonthlyRouter)
router.use('/bill', authMiddleware(['ADMIN', 'SUPERADMIN']), billRouter)
router.use('/dashboard', authMiddleware(['ADMIN', 'SUPERADMIN']), dashboardRouter)
router.use('/living', authMiddleware(['ADMIN', 'SUPERADMIN']), livingRouter)

module.exports = router