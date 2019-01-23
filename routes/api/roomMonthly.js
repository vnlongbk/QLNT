const express = require('express');
const SuperRouter = require('../superRouter')
const router = express.Router();
const roomMonthly = require('../../model/roomMonthly')

class RoomMonthlyRouter extends SuperRouter {
    constructor(Model) {
        super(Model)
    }
    async add(req, res) {
        try {
            const getTime = new Date()
            const getMonth = getTime.getMonth()
            const getYear = getTime.getFullYear()
            const data = await roomMonthly.findOne({
                month: getMonth + 1,
                year: getYear,
                room: req.body.room
            })
            if (data) {
                if (req.body.electric)
                    data.electric = req.body.electric
                if (req.body.water)
                    data.water = req.body.water
                if (req.body.internet)
                    data.internet = req.body.internet
                if (req.body.tv)
                    data.tv = req.body.tv
                if (req.body.trash)
                    data.trash = req.body.trash
                await data.save()
                res.json({
                    data,
                    message: "Lưu số điện nước thành công"
                })
            } else {
                const newRoomMonthly = new roomMonthly({
                    room: req.body.room,
                    month: getMonth + 1,
                    year: getYear,
                    electric: req.body.electric,
                    water: req.body.water,
                    internet: req.body.internet,
                    tv: req.body.tv,
                    trash: req.body.trash
                })
                await newRoomMonthly.save()
                res.json({
                    newRoomMonthly,
                    message: "Ghi số điện nước thành công"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Lỗi server' })
        }
    }
}

const _roomMonthly = new RoomMonthlyRouter(roomMonthly)

router.put('/', _roomMonthly.add)

module.exports = router