const express = require('express');
const router = express.Router();
const { getActivities, createActivity } = require('../controllers/activityController');
const { protect } = require('../middlewares/auth');

router.route('/').get(getActivities);
router.route('/').post(protect, createActivity);


module.exports = router;