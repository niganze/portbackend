import express from 'express';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

// POST request to create a project
router.post('/', createProject);

// GET request to get all projects
router.get('/', getAllProjects);

// GET request to get a project by ID
router.get('/:id', getProjectById);

// PUT request to update a project
router.put('/:id', updateProject);

// DELETE request to delete a project
router.delete('/:id', deleteProject);


export default router;
