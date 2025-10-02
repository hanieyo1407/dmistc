import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: String,
    url: String,
    type: String,
});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    longDescription: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: [String],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    status: {
        type: String,
        enum: ['draft', 'pending', 'published', 'featured', 'rejected'],
        default: 'pending',
    },
    files: [fileSchema],
    githubLink: String,
    liveDemo: String,
    imageUrl: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
