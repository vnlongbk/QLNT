const express = require('express');
const router = express.Router();
const SuperRouter = require('../superRouter')
const Room = require('../../model/room')
const Bill = require('../../model/bill')
const roomMonthly = require('../../model/roomMonthly')
const getTime = new Date()
const getMonth = getTime.getMonth()

class BillRouter extends SuperRouter {
    constructor(Model) {
        super(Model)
    }

    async getBillAbout(req, res) {
        try {
            let data = []
            if (Object.keys(req.query).length === 0) {
                data = await Bill.find({
                    year: req.params.year,
                    room: req.params.idRoom
                })
            } else {
                data = await Bill.find({
                    month: { $gte: req.query.from, $lte: req.query.to || getMonth + 1 },
                    year: req.params.year,
                    room: req.params.idRoom
                })
            }
            if (data.length > 0) {
                res.json(data)
            } else {
                res.json({
                    message: "Không có hóa đơn"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Lỗi server' })
        }
    }

    async getAll(req, res) {
        try {
            const data = await Bill.find({
                room: req.params.idRoom
            }).populate('room')
            if (data.length > 0) {
                res.json({
                    data,
                    success: true
                })
            } else {
                res.json({
                    message: "Không có hóa đơn phòng này"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Lỗi server' })
        }
    }

    async postBill(req, res) {
        try {
            const getTime = new Date()
            const getMonth = getTime.getMonth()
            const getYear = getTime.getFullYear()
            const room_Price = await Room.findById(req.body.room)
            const data = await Bill.findOne({
                room: req.body.room,
                month: getMonth + 1
            })
            if (data) {
                res.json({
                    message: 'Đã có bill tháng này'
                })
            } else {
                const dataCurrent = await roomMonthly.findOne({
                    month: getMonth + 1,
                    year: getYear,
                    room: req.body.room
                })
                const dataLastMonth = await roomMonthly.findOne({
                    month: getMonth,
                    year: getYear,
                    room: req.body.room
                })
                const newBill = new Bill({
                    idOldMonthly: dataLastMonth._id,
                    idNewMonthly: dataCurrent._id,
                    room: req.body.room,
                    month: getMonth + 1,
                    year: getYear,
                    electricPrice: (dataCurrent.electric - dataLastMonth.electric) * 2500,
                    waterPrice: (dataCurrent.water - dataLastMonth.water) * 15000,
                    internetPrice: dataCurrent.internet * 10000 || 0,
                    trashPrice: 50000,
                    tvPrice: 50000,
                })
                newBill.total = room_Price.roomPrice + newBill.electricPrice + newBill.waterPrice + newBill.internetPrice + newBill.trashPrice + newBill.tvPrice

                await newBill.save()
                res.json({
                    newBill,
                    message: "Tạo hóa đơn thành công"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Lỗi server' })
        }

    }
}

const bill = new BillRouter(Bill)

router.get('/all/:idRoom', bill.getAll)
router.get('/:idRoom/:year', bill.getBillAbout)
router.post('/', bill.postBill)

module.exports = router
