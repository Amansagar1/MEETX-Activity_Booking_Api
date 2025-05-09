const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { bookActivity, getMyBookings } = require('../controllers/bookingController');
const { bookingValidation } = require('../validations/bookingValidations');
const validate = require('../middlewares/validate');

router.route('/').post(protect, validate(bookingValidation), bookActivity);
router.route('/mybookings').get(protect, getMyBookings);

module.exports = router;