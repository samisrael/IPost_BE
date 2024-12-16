const mongoose = require('mongoose')

const timeslotsModel = new mongoose.Schema(
    {
            customer_id: {
                type: String, 
                required: true,
        },
            city: {
                type : String,
                required : true
        },

            date :{
                type : Date,
                required : true
        },
            start_time :{
                type : Date,
                required : true
        },
            end_time :{
                type : Date,
                required : true,
        },
            capacity: {
                type: Number,
                required: true,
        },
            booked_count: {
                type: Number,
                default: 0,
        },
            available_slots: {
                type: Number,
                default: 0,
        }
    },
    {
        collection:'timeslots'
    }
)



module.exports = mongoose.model('tiemslots',timeslotsModel)