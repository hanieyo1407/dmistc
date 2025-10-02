import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
    name: String,
    url: String,
    type: String,
});

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    duration: Number,
    location: {
        type: String,
        required: true,
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    meetingLink: String,
    maxAttendees: Number,
    registeredMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    attendedMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    materials: [materialSchema],
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
