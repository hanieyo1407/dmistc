import Project from '../models/projectModel.js';

// @desc    Fetch all published projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    try {
        const keyword = req.query.keyword ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        const count = await Project.countDocuments({ ...keyword, status: 'published' });
        const projects = await Project.find({ ...keyword, status: 'published' })
            .populate('author', 'profile.firstName profile.lastName')
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        
        res.json({ projects, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch a single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('author', 'profile.firstName profile.lastName')
            .populate('collaborators', 'profile.firstName profile.lastName');

        if (project) {
            res.json(project);
        } else {
            res.status(404);
            throw new Error('Project not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res, next) => {
    try {
        const project = new Project({
            ...req.body,
            author: req.user._id,
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            // Check if user is the author or an admin/executive
            const isAuthorized = project.author.toString() === req.user._id.toString() || 
                                 ['EXECUTIVE', 'ADMIN', 'SYSTEM_ADMIN'].includes(req.user.role);

            if (!isAuthorized) {
                res.status(403);
                throw new Error('User not authorized to update this project');
            }

            // Update fields from request body
            Object.assign(project, req.body);

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

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
             const isAuthorized = project.author.toString() === req.user._id.toString() || 
                                 ['EXECUTIVE', 'ADMIN', 'SYSTEM_ADMIN'].includes(req.user.role);

            if (!isAuthorized) {
                res.status(403);
                throw new Error('User not authorized to delete this project');
            }

            await project.deleteOne();
            res.json({ message: 'Project removed' });
        } else {
            res.status(404);
            throw new Error('Project not found');
        }
    } catch (error) {
        next(error);
    }
};

export {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};
