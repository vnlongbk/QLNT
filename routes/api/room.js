const express = require('express');
const router = express.Router();
const SuperRouter = require('../superRouter')
const Living = require('../../model/living')
const roomController = require('../../controllers/room')

class RoomRouter extends SuperRouter {
    constructor(roomController) {
        super(roomController)
    }

    async getUserOnRoom(req, res) {
        try {
            const data = await Living.find({
                room: req.params.idRoom
            }).populate('user')
            if (data) {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.json({
                    message: "Không có người dùng trong phòng này"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Lỗi server'
            })
        }
    }

}

const room = new RoomRouter(roomController)

router.get('/', room.getAll)
router.get('/:id', room.getOne)
router.post('/', room.add)
router.get('/:idRoom/user', room.getUserOnRoom)
router.put('/:id', room.edit)
router.delete('/:id', room.delete)

module.exports = router