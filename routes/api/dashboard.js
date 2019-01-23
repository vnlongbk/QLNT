const express = require('express');
const router = express.Router();
const SuperRouter = require('../superRouter')
const RoomMonthly = require('../../model/roomMonthly')

class DashboardRouter extends SuperRouter {
    constructor(Model) {
        super(Model)
    }
    async get(req, res) {
        try {
            const data = await RoomMonthly.find({
                room: req.params.idRoom
            })
            res.json(data)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Lỗi server'
            })
        }
    }
}

const dashboard = new DashboardRouter()

router.get('/:idRoom', dashboard.get)

module.exports = router