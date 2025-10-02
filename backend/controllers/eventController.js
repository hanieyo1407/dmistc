import Event from '../models/eventModel.js';

// @desc    Fetch all upcoming events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find({ date: { $gte: new Date() } })
            .sort({ date: 'asc' })
            .populate('createdBy', 'profile.firstName profile.lastName');
        res.json(events);
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch a single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('createdBy', 'profile.firstName profile.lastName')
            .populate('registeredMembers', 'profile.firstName profile.lastName');

        if (event) {
            res.json(event);
        } else {
            res.status(404);
            throw new Error('Event not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Register current user for an event
// @route   POST /api/events/:id/register
// @access  Private
const registerForEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            if (event.registeredMembers.includes(req.user._id)) {
                res.status(400);
                throw new Error('Already registered for this event');
            }
            event.registeredMembers.push(req.user._id);
            await event.save();
            res.status(200).json({ message: 'Successfully registered for event' });
        } else {
            res.status(404);
            throw new Error('Event not found');
        }
    } catch (error) {
        next(error);
    }
};

export {
    getEvents,
    getEventById,
    registerForEvent,
};
