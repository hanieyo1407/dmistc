import Resource from '../models/resourceModel.js';

// @desc    Fetch all resources
// @route   GET /api/resources
// @access  Public (or Private for members, depending on final logic)
const getResources = async (req, res, next) => {
    try {
        const resources = await Resource.find({}).populate('uploadedBy', 'profile.firstName profile.lastName');
        res.json(resources);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a resource
// @route   POST /api/resources
// @access  Private/Executive
const createResource = async (req, res, next) => {
    try {
        const resource = new Resource({
            ...req.body,
            uploadedBy: req.user._id,
        });
        const createdResource = await resource.save();
        res.status(201).json(createdResource);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private/Executive
const deleteResource = async (req, res, next) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (resource) {
            await resource.deleteOne();
            res.json({ message: 'Resource removed' });
        } else {
            res.status(404);
            throw new Error('Resource not found');
        }
    } catch (error) {
        next(error);
    }
};

export {
    getResources,
    createResource,
    deleteResource,
};
