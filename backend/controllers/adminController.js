import User from '../models/userModel.js';
import Project from '../models/projectModel.js';
import Event from '../models/eventModel.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// @desc    Update user status
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
const updateUserStatus = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.membershipStatus = req.body.status || user.membershipStatus;
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                membershipStatus: updatedUser.membershipStatus,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create an event
// @route   POST /api/admin/events
// @access  Private/Executive
const createEvent = async (req, res, next) => {
    try {
        const event = new Event({
            ...req.body,
            createdBy: req.user._id,
        });
        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        next(error);
    }
};

// @desc    Update an event
// @route   PUT /api/admin/events/:id
// @access  Private/Executive
const updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            Object.assign(event, req.body);
            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404);
            throw new Error('Event not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete an event
// @route   DELETE /api/admin/events/:id
// @access  Private/Executive
const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event removed' });
        } else {
            res.status(404);
            throw new Error('Event not found');
        }
    } catch (error) {
        next(error);
    }
};


// @desc    Get all projects (for admin view)
// @route   GET /api/admin/projects
// @access  Private/Executive
const getProjectsAdmin = async (req, res, next) => {
    try {
        // No status filter for admin
        const projects = await Project.find({}).populate('author', 'profile.firstName profile.lastName');
        res.json(projects);
    } catch (error) {
        next(error);
    }
};

// @desc    Update project status
// @route   PUT /api/admin/projects/:id/status
// @access  Private/Executive
const updateProjectStatus = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            project.status = req.body.status || project.status;
            // Also handle featured toggle
            if(req.body.featured !== undefined) {
                project.featured = req.body.featured;
            }
            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404);
            throw new Error('Project not found');
        }
    } catch (error) {
        next(error);
    }
};


export {
    getUsers,
    updateUserStatus,
    createEvent,
    updateEvent,
    deleteEvent,
    getProjectsAdmin,
    updateProjectStatus
};
