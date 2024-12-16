const TimeSlot = require('../models/timeslotsModel'); // Import the TimeSlot model
const bcrypt = require('bcryptjs')

// Book a specific time slot
const bookTimeSlot = async (req, res) => {
    const { city, date, slotId } = req.body;

    try {
        if (!city || !date || !slotId) {
            return res.status(400).json({ message: 'City, date, and slot ID are required' });
        }

        // Find the specific time slot
        const timeSlot = await TimeSlot.findOne({ _id: slotId, city, date: new Date(date) });

        if (!timeSlot) {
            return res.status(404).json({ message: 'Time slot not found' });
        }

        // Check if the slot is full
        if (timeSlot.booked_count >= timeSlot.capacity) {
            return res.status(400).json({ message: 'Time slot is already full' });
        }

        // Update booked count and available slots
        timeSlot.booked_count += 1;
        timeSlot.available_slots = timeSlot.capacity - timeSlot.booked_count;

        await timeSlot.save();

        return res.status(200).json({ message: 'Time slot booked successfully', timeSlot });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { bookTimeSlot };
