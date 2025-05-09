const express = require('express');
const { protect } = require('../middlewares/auth');
const { bookActivity, getMyBookings } = require('../controllers/bookingController');

const router = express.Router();

// Protect these routes with the `protect` middleware
router.post('/', protect, bookActivity);
router.get('/mybookings', protect, getMyBookings);

module.exports = router;
