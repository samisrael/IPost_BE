const express = require('express')
const router = express.Router()
const {bookTimeSlot} = require('../controllers/bookTimeSlotController')

router.route('/').post(bookTimeSlot)

module.exports = router