// ----------this is for varification password work correctly or not------------------


const User = require('../models/User');
const getAllUsers = async (req, res) => {
  try {
    //   const users = await User.find().select('-password');
    const users = await User.find(); 

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAllUsers };
