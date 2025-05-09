const Activity = require('../models/Activity');



// ----------activity get call------------------
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ dateTime: 1 });
    res.json(activities);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ----------activity post call------------------
const createActivity = async (req, res) => {
  const { title, description, location, dateTime } = req.body;

  try {
    const activity = new Activity({
      title,
      description,
      location,
      dateTime,
    });

    const createdActivity = await activity.save();
    res.status(201).json(createdActivity);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getActivities,
  createActivity,
};