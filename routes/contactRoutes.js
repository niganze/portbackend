import express from 'express';
import { sendContactEmail } from '../controllers/contactController.js';

const router = express.Router();

// POST request to send a contact form
router.post('/contact', sendContactEmail);

export default router;
