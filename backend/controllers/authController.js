import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            if (user.membershipStatus !== 'active') {
                res.status(403);
                throw new Error(`Your account status is '${user.membershipStatus}'. Please contact an administrator.`);
            }

            const token = generateToken(res, user._id);

            res.json({
                _id: user._id,
                name: `${user.profile.firstName} ${user.profile.lastName}`,
                email: user.email,
                role: user.role,
                executiveRole: user.executiveRole,
                profile: user.profile,
                token: token,
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    const { firstName, lastName, studentId, email, password, program, year, interests } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            studentId,
            email,
            password, // Hashing is handled by the pre-save hook in userModel
            profile: {
                firstName,
                lastName,
                profileImage: `https://i.pravatar.cc/150?u=${email}`,
                bio: '',
                skills: [],
                interests,
                socialLinks: {},
            },
            role: 'MEMBER',
            membershipStatus: 'pending',
        });

        if (user) {
             // We don't log the user in automatically, they must be approved first.
             res.status(201).json({
                message: 'Registration successful! Your application is pending approval.'
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};


export { loginUser, registerUser };
