import Project from '../models/Project.js';
import uploadCloudinary from '../utils/cloudinary.js';

// Create new project
export const createProject = async (req, res) => {
  const { title, description, techStack } = req.body;

  // Validate request body
  if (!title || !description || !techStack) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  let project_images = [];

  try {
    // Check if image files are provided
    if (req.files && req.files.image) {
      console.log("Images provided.");

      // Upload each image to Cloudinary
      for (const file of req.files.image) {
        const uploadedImageUrl = await uploadCloudinary(file);
        project_images.push(uploadedImageUrl); // Add each uploaded image URL to the array
      }

      console.log("Uploaded image URLs:", project_images);
    } else {
      console.log("No images provided.");
    }

    // Create new project with the uploaded images or an empty array
    const project = new Project({
      title,
      description,
      image: project_images, // Save all uploaded image URLs
      techStack: techStack.split(',') // Assuming techStack is a comma-separated string
    });

    // Save project to the database
    const savedProject = await project.save();
    res.status(201).json(savedProject);

  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project' });
  }
};



// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project' });
  }
};

// Update a project by ID
export const updateProject = async (req, res) => {
  const { title, description, image, techStack } = req.body;

  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.image = image || project.image;
    project.techStack = techStack || project.techStack;

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
};

// Delete a project by ID
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.remove();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
};
