const User = require('../models/User'); // Ensure this path matches your actual model file

exports.getUserProfile = async (req, res) => {
    try {
        // Ensure req.user.id is available, usually set by authentication middleware
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(400).json({ message: 'Error fetching user profile', details: error.message });
    }
};
