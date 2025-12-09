// models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true
  },
  specialty: {
    type: String,
    required: [true, 'Specialty is required'],
    trim: true
  },
  hospital: {
    type: String,
    required: [true, 'Hospital is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  years: {
    type: String,
    required: [true, 'Years of experience is required']
  },
  avatar: {
    type: String,
    default: 'https://randomuser.me/api/portraits/lego/1.jpg'
  },
  bio: {
    type: String,
    default: ''
  },
  education: [{
    degree: String,
    institution: String,
    year: String
  }],
  languages: {
    type: [String],
    default: ['English']
  },
  availability: {
    type: String,
    enum: ['available', 'busy', 'unavailable'],
    default: 'available'
  },
  consultationFee: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
doctorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;