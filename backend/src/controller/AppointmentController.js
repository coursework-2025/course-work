// src/controller/AppointmentController.js
const Appointment = require('../model/Appointment');
const Doctor = require('../model/Doctor');

// Generate all time slots (9 AM to 5 PM)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const hour12 = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    slots.push(`${hour12}:00 ${ampm}`);
    if (hour < 17) slots.push(`${hour12}:30 ${ampm}`);
  }
  return slots;
};

// Get available time slots
exports.getAvailability = async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    
    console.log('Getting availability for:', { doctorId, date });
    
    if (!doctorId || !date) {
      return res.status(400).json({
        success: false,
        message: 'Doctor ID and date are required'
      });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Parse date
    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Get booked appointments for this doctor on this date
    const bookedAppointments = await Appointment.find({
      doctorId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      status: { $ne: 'cancelled' } // Don't count cancelled appointments
    });

    // Extract booked times
    const bookedTimes = bookedAppointments.map(app => app.time);
    
    // Generate all possible slots
    const allSlots = generateTimeSlots();
    
    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

    console.log('Booked times:', bookedTimes);
    console.log('Available slots:', availableSlots);

    res.json({
      success: true,
      doctorId,
      date,
      availableSlots,
      bookedTimes,
      totalSlots: allSlots.length,
      doctorName: doctor.name
    });

  } catch (error) {
    console.error('Availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

// Book appointment
exports.bookAppointment = async (req, res) => {
  try {
    console.log('📝 Booking request:', req.body);
    
    const { doctorId, date, time, serviceType, notes, patientName, patientEmail, patientPhone } = req.body;

    // Simple validation
    if (!doctorId || !date || !time || !patientName || !patientEmail) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      });
    }

    // Get doctor details
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Parse date
    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);

    // Check if slot is already booked
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: appointmentDate,
      time,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked. Please choose another time.'
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patientName,
      patientEmail,
      patientPhone: patientPhone || '',
      doctorId,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorHospital: doctor.hospital,
      date: appointmentDate,
      time,
      serviceType: serviceType || 'Consultation',
      notes: notes || '',
      consultationFee: doctor.consultationFee || 50000,
      status: 'pending'
    });

    console.log('✅ Appointment created:', appointment._id);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully!',
      appointment
    });

  } catch (error) {
    console.error('❌ Booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

// Get user's appointments
exports.getMyAppointments = async (req, res) => {
  try {
    const { patientEmail } = req.query;
    
    if (!patientEmail) {
      return res.status(400).json({
        success: false,
        message: 'Patient email is required'
      });
    }

    const appointments = await Appointment.find({ patientEmail })
      .sort({ date: -1, time: -1 });

    res.json({
      success: true,
      count: appointments.length,
      appointments
    });

  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};