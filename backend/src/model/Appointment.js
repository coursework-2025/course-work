// src/model/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  patientPhone: String,
  doctorId: { type: String, required: true },
  doctorName: String,
  doctorSpecialty: String,
  doctorHospital: String,
  date: { type: Date, required: true },
  time: { type: String, required: true },
  serviceType: { type: String, required: true },
  consultationFee: Number,
  status: { type: String, default: 'pending' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);