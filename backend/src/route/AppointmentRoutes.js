// src/routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/AppointmentController');

// GET /api/appointments/availability?doctorId=xxx&date=yyyy-MM-dd
router.get('/availability', appointmentController.getAvailability);

// POST /api/appointments - Book appointment
router.post('/', appointmentController.bookAppointment);

// GET /api/appointments?patientEmail=xxx - Get user's appointments
router.get('/', appointmentController.getMyAppointments);

module.exports = router;