// controllers/doctorController.js
const Doctor = require('../model/Doctor.js');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getAllDoctors = async (req, res) => {
  try {
    const { search, specialty, location, availability } = req.query;

    // Build query
    let query = { isActive: true };

    // Search by name, specialty, or hospital
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } },
        { hospital: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by specialty
    if (specialty) {
      query.specialty = { $regex: specialty, $options: 'i' };
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Filter by availability
    if (availability) {
      query.availability = availability;
    }

    const doctors = await Doctor.find(query).sort({ rating: -1, name: 1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors
    });
  } catch (error) {
    console.error('Get all doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching doctors'
    });
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      doctor
    });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching doctor'
    });
  }
};

// @desc    Create new doctor
// @route   POST /api/doctors
// @access  Private/Admin
exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Doctor created successfully',
      doctor
    });
  } catch (error) {
    console.error('Create doctor error:', error);

    // Handle duplicate email
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Doctor with this email already exists'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating doctor'
    });
  }
};

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      doctor
    });
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating doctor'
    });
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully'
    });
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting doctor'
    });
  }
};

// @desc    Get doctors by hospital
// @route   GET /api/doctors/hospital/:hospitalName
// @access  Public
exports.getDoctorsByHospital = async (req, res) => {
  try {
    const { hospitalName } = req.params;

    const doctors = await Doctor.find({
      hospital: { $regex: hospitalName, $options: 'i' },
      isActive: true
    }).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      hospital: hospitalName,
      doctors
    });
  } catch (error) {
    console.error('Get doctors by hospital error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching doctors'
    });
  }
};

// @desc    Get doctors by specialty
// @route   GET /api/doctors/specialty/:specialtyName
// @access  Public
exports.getDoctorsBySpecialty = async (req, res) => {
  try {
    const { specialtyName } = req.params;

    const doctors = await Doctor.find({
      specialty: { $regex: specialtyName, $options: 'i' },
      isActive: true
    }).sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      specialty: specialtyName,
      doctors
    });
  } catch (error) {
    console.error('Get doctors by specialty error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching doctors'
    });
  }
};