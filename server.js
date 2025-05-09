const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

// --------------routes-------///
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const devRoutes = require('./routes/devRoutes');

const app = express();

// --------------midleware body parser-------///
app.use(express.json());
app.use(cors());

///-----------this is personal dev loger---------
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/auth', authRoutes);
app.use('/api/dev', devRoutes);

app.use('/api/activities', activityRoutes);
app.use('/api/bookings', bookingRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});


app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the MeetX Booking API!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production'
  });
});


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
