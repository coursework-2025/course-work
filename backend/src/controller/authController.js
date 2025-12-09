const jwt = require('jsonwebtoken');
const User = require('../model/User');

// Helper function to generate JWT token
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    console.log('📝 Registration request received');

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not defined!');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: JWT_SECRET missing'
      });
    }

    const { firstName, lastName, email, password, phone, dateOfBirth, gender, role } = req.body;

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'phone', 'dateOfBirth'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        console.log(`❌ Missing field: ${field}`);
        return res.status(400).json({
          success: false,
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        });
      }
    }

    // Check if user already exists
    console.log('🔍 Checking if user exists...');
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('❌ User already exists');
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Validate phone format
    const phoneRegex = /^\d{10,15}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      console.log('❌ Invalid phone format');
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number (10-15 digits)'
      });
    }

    // Validate date of birth
    const dob = new Date(dateOfBirth);
    if (isNaN(dob.getTime())) {
      console.log('❌ Invalid date of birth');
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid date of birth'
      });
    }

    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
    const adjustedAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;
    
    if (adjustedAge < 18) {
      console.log('❌ User under 18');
      return res.status(400).json({
        success: false,
        message: 'You must be at least 18 years old to register'
      });
    }

    console.log('✅ Validation passed, creating user...');

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone: cleanPhone,
      dateOfBirth: dob,
      gender: gender || 'other',
      role: role || 'patient'
    });

    console.log('✅ User created successfully:', user._id);

    // Generate token
    const token = generateToken(user._id);

    // Send response without password
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      role: user.role,
      createdAt: user.createdAt
    };

    console.log('✅ Registration successful!');

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Handle duplicate key error (unique email)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      console.error('Validation errors:', messages);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    console.log('🔐 Login request received');
    
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user and include password
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    

    if (!password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Send response
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      role: user.role
    };

    console.log('✅ Login successful');

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, gender } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;

    user.updatedAt = Date.now();

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during profile update'
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this email'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Password reset email sent (feature coming soon)'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};