const express = require('express');
const router = express.Router();
const SuperRouter = require('../superRouter')
const livingController = require('../../controllers/living')

class LivingRouter extends SuperRouter {
    constructor(controller) {
        super(controller)
    }
}

const living = new LivingRouter(livingController)

router.get('/', living.getAll)

module.exports = router