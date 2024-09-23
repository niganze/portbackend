import express from 'express';
import { sendContactEmail, getAllMessages, deleteMessage } from '../controllers/contactController.js';

const router = express.Router();

// POST request to send a contact form
router.post('/contact', sendContactEmail);

// GET request to retrieve all messages
router.get('/messages', getAllMessages);

// DELETE request to delete a message by ID
router.delete('/messages/:id', deleteMessage);

export default router;
