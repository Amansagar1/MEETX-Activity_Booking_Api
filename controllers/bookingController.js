const Booking = require('../models/Booking');
const Activity = require('../models/Activity');
const { Types } = require('mongoose');

const bookActivity = async (req, res) => {
  const { activityId } = req.body;

  if (!Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({ 
      success: false,
      message: 'Invalid activity ID format' 
    });
  }

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ 
        success: false,
        message: 'Activity not found' 
      });
    }
    const existingBooking = await Booking.findOne({
      user: req.user._id,
      activity: activityId
    });

    if (existingBooking) {
      return res.status(409).json({ 
        success: false,
        message: 'You have already booked this activity',
        booking: existingBooking
      });
    }
    const booking = new Booking({
      user: req.user._id,
      activity: activityId
    });

    const savedBooking = await booking.save();
    
    const populatedBooking = await Booking.populate(savedBooking, {
      path: 'activity',
      select: 'title description location dateTime'
    });

    res.status(201).json({
      success: true,
      data: populatedBooking
    });

  } catch (err) {
    console.error('[Booking Error]', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid ID format' 
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};



///-------------------getbookin----------//
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: 'activity',
        select: 'title description location dateTime'
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });

  } catch (err) {
    console.error('[Get Bookings Error]', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

module.exports = {
  bookActivity,
  getMyBookings
};