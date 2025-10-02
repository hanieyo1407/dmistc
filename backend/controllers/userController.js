import User from '../models/userModel.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
    try {
        // req.user is attached by the protect middleware
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: `${user.profile.firstName} ${user.profile.lastName}`,
                email: user.email,
                role: user.role,
                executiveRole: user.executiveRole,
                profile: user.profile,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.profile.firstName = req.body.profile.firstName || user.profile.firstName;
            user.profile.lastName = req.body.profile.lastName || user.profile.lastName;
            user.profile.bio = req.body.profile.bio || user.profile.bio;
            user.profile.skills = req.body.profile.skills || user.profile.skills;
            user.profile.interests = req.body.profile.interests || user.profile.interests;
            user.profile.socialLinks = req.body.profile.socialLinks || user.profile.socialLinks;
            
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: `${updatedUser.profile.firstName} ${updatedUser.profile.lastName}`,
                email: updatedUser.email,
                role: updatedUser.role,
                executiveRole: updatedUser.executiveRole,
                profile: updatedUser.profile,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};


export {
    getUserProfile,
    updateUserProfile,
};
