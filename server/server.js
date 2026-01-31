const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors')
app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


const dotenv = require('dotenv');
dotenv.config({ path: "./.env" });

const DB = process.env.MONGODB_URI;
const mongoose = require('mongoose');
mongoose.connect(DB);
const dbConnection = mongoose.connection;
dbConnection.on('error', ()=>{
  console.log('MongoDB connection failed')
});
dbConnection.once('open', () => {
  console.log('Connected to MongoDB');
});


const hotelRoutes = require('./routes/hotelRoutes')
app.use('/api/hotel', hotelRoutes);
const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes);
const bookingRoutes = require('./routes/bookingsRoutes')
app.use('/api/bookings', bookingRoutes);


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})