const TimeSlot = require('../models/timeslotsModel'); // Import the TimeSlot model

// Fetch available time slots for a given city and date
const fetchTimeSlots = async (req, res) => {
    const { city, date } = req.body;

    try {
        if (!city || !date) {
            return res.status(400).json({ message: 'City and date are required' });
        }

        // Find all time slots for the given city and date
        const timeSlots = await TimeSlot.find({ city, date: new Date(date) });

        if (timeSlots.length > 0) {
            return res.status(200).json({ timeSlots });
        } else {
            // If no slots are found, return slots with full capacity (15 slots)
            const defaultTimeSlots = [];
            const timeSlotStart = 10; // Start at 10:00 AM

            // Generate 8 slots (10:00 AM - 6:00 PM)
            for (let i = 0; i < 8; i++) {
                const startTime = new Date(date);
                startTime.setHours(timeSlotStart + i, 0, 0); // Example: 10:00 AM, 11:00 AM...

                const endTime = new Date(startTime);
                endTime.setHours(startTime.getHours() + 1); // End time is 1 hour after start time

                // Add each slot with a capacity of 15 and no bookings yet
                defaultTimeSlots.push({
                    city,
                    date,
                    start_time: startTime,
                    end_time: endTime,
                    capacity: 15,
                    booked_count: 0, // Initially, no bookings
                });
            }

            // Return default slots with full capacity
            return res.status(200).json({ timeSlots: defaultTimeSlots });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { fetchTimeSlots };
