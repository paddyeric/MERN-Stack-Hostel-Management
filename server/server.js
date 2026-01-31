const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors')
require('dotenv').config();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


// Database connection
const connectDB = require('./config/db');
connectDB();


//Routes
const hotelRoutes = require('./routes/hotelRoutes')
app.use('/api/hotel', hotelRoutes);
const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes);
const bookingRoutes = require('./routes/bookingsRoutes')
app.use('/api/bookings', bookingRoutes);



if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;