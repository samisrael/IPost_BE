const express = require('express')
const router = express.Router()
const {generateDefaultTimeSlots} = require('../controllers/generateDefaultTimeSlotsController')

router.route('/').post(generateDefaultTimeSlots)

module.exports = router