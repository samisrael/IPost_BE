const TimeSlot = require('../models/timeslotsModel'); // Import the TimeSlot model
const bcrypt = require('bcryptjs')

// Generate 15 default time slots for a given city and date
const generateDefaultTimeSlots = async (req, res) => {
  const { city, date } = req.body;

  try {
    if (!city || !date) {
      return res.status(400).json({ message: 'City and date are required' });
    }

    // Check if time slots already exist for the city and date
    const existingSlots = await TimeSlot.find({ city, date: new Date(date) });
    if (existingSlots.length > 0) {
      return res.status(400).json({ message: 'Time slots already exist for this date and city' });
    }

    // Generate 15 default time slots (1 hour each)
    const defaultSlots = [];
    let startHour = 9; // Start time at 9:00 AM

    for (let i = 0; i < 15; i++) {
      const startTime = new Date(date);
      startTime.setHours(startHour, 0, 0);

      const endTime = new Date(startTime);
      endTime.setHours(startHour + 1);

      defaultSlots.push({
        city,
        date: new Date(date),
        start_time: startTime,
        end_time: endTime,
        capacity: 10,
        booked_count: 0,
        available_slots: 10,
      });

      startHour++;
    }

    // Insert default time slots into the database
    await TimeSlot.insertMany(defaultSlots);

    return res.status(201).json({ message: 'Default time slots generated successfully', timeSlots: defaultSlots });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {  generateDefaultTimeSlots };
