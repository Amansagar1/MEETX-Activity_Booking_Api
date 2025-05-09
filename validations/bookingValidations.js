const { body } = require('express-validator');

exports.bookingValidation = [
  body('activityId').notEmpty().withMessage('Activity ID is required'),
];
exports.updateBookingValidation = [
  body('bookingId').notEmpty().withMessage('Booking ID is required'),
  body('status').notEmpty().withMessage('Status is required'),
];
exports.deleteBookingValidation = [
  body('bookingId').notEmpty().withMessage('Booking ID is required'),
];