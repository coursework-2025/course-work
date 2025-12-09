// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();

// Import controller functions
const doctorController = require('../controller/DoctorController.js');
const { protect, authorize } = require('../middleware/authMiddleware.js');

// Public routes
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctor);
router.get('/hospital/:hospitalName', doctorController.getDoctorsByHospital);
router.get('/specialty/:specialtyName', doctorController.getDoctorsBySpecialty);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), doctorController.createDoctor);
router.put('/:id', protect, authorize('admin'), doctorController.updateDoctor);
router.delete('/:id', protect, authorize('admin'), doctorController.deleteDoctor);

module.exports = router;