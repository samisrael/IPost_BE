const express = require('express')
const router = express.Router()
const {fetchTimeSlots} = require('../controllers/fetchTimeSlotsController')

router.route('/').post(fetchTimeSlots)

module.exports = router