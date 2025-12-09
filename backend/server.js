const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/database/database.js');
const authRoutes = require('./src/route/authRoutes.js');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware - FIX: Added parentheses to express.json()
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', require('./src/route/DoctorRoute.js'));
app.use('/api/appointments', require('./src/route/AppointmentRoutes.js'));

// Start server
app.listen(PORT, async () => {
  console.log(`Server started at http://localhost:${PORT}`);
  await connectDB();
});