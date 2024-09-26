import express from 'express';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController.js';
import { uploaded } from '../utils/multer.js';


const router = express.Router();

// POST request to create a project
router.post('/', uploaded, createProject);  // Apply Multer middleware here

// GET request to get all projects
router.get('/', getAllProjects);

// GET request to get a project by ID
router.get('/:id', getProjectById);

// PUT request to update a project
router.put('/:id', updateProject);

// DELETE request to delete a project
router.delete('/:id', deleteProject);

export default router;
