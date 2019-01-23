const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/qlnt', { useNewUrlParser: true });
mongoose.Promise = Promise;


const userController = require('../controllers/user')
const innController = require('../controllers/inn')
const roomController = require('../controllers/room')
const livingController = require('../controllers/living')

const billingController = require('../controllers/bill')
const roomMonthlyController = require('../controllers/roomMonthly')

const authService = require('../services/auth')

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const admins = [
    {
        username: 'admin',
        password: authService.sha512('admin', '123'),
        role: 'SUPERADMIN'
    },

    {
        username: 'admin1',
        password: authService.sha512('admin', '123'),
        role: 'ADMIN',
        inns: [
            {
                address: '11A/1D Đồng An 2, Bình Hòa, Bình Dương',
                phoneNumber: '0123456789',
                electricPrice: 2500,
                waterPrice: 15000,
                trashPrice: 15000,
                rooms: [
                    {
                        roomNumber: '1_1',
                        roomPrice: 1000000
                    },
                    {
                        roomNumber: '1_2',
                        roomPrice: 1100000
                    },
                    {
                        roomNumber: '1_3',
                        roomPrice: 1200000
                    }
                ]
            }
        ]
    },

    {
        username: 'admin2',
        password: authService.sha512('admin2', '123'),
        role: 'ADMIN',
        inns: [
            {
                address: '1441312 Đồng An 2, Bình Hòa, Bình Dương',
                phoneNumber: '0123456789',
                electricPrice: 2500,
                waterPrice: 15000,
                trashPrice: 15000,
                rooms: [
                    {
                        roomNumber: '2_1',
                        roomPrice: 1000000
                    },
                    {
                        roomNumber: '2_2',
                        roomPrice: 1100000
                    },
                    {
                        roomNumber: '2_3',
                        roomPrice: 1200000
                    }
                ]
            }
        ]
    },
]

const runAddRoom = async () => {
    try {
        for (const admin of admins) {
            const { username, password, role, inns = [] } = admin
            const adminItem = await userController.add({username, password, role})
            for (let inn of inns) {
                inn.owner = adminItem._id;
                const { rooms = [] } = inn
                const innObject = await innController.add(inn);
                for (let room of rooms) {
                    room.inn = innObject._id
                    await roomController.add(room)
                }
            }
        }
    } catch (error) {
        console.log(error)
    }

}



const addUser = async () => {
    const rooms = await roomController.getAll();
    for (let room of rooms) {
        console.log('room', room.roomNumber)
        const users = [1, 2, 3]
        for (let user of users) {
            // create user
            user = await userController.add({
                username: `user_${room.roomNumber}_${user}`,
                password: authService.sha512('123456', '123')
            })
            // create living
            const living = await livingController.add({
                user: user._id,
                room: room._id,
                startDate: new Date()
            })
        }

        // create billing
        const months = [ 1, 2, 3, 4, 5, 6, 7, 8]
        console.log('generate billing')
        await Promise.all(months.map(async month => {
            // generate monthly
            const roomMonth = await roomMonthlyController.add({
                'room': room._id,
                'month': month,
                'year': 2018,
                'electric': month * 30,
                'water': month * 10,
                'internet': 15000,
                'tv': true,
                'trash': true,
            })
            // generate Bill
            await billingController.add({
                'room': room._id,
                'month': month,
                'year': 2018,
                'electricPrice': 30*2500,
                'waterPrice': 10*15000,
                'internetPrice': 15000,
                'tvPrice': 15000,
                'trashPrice': 15000,
                'total': room.roomPrice + 75000 + 150000 + 45000
            })

        }))

    }
}

const run = async () => {
    await runAddRoom();
    await addUser()
    console.log('done')
}


run()
