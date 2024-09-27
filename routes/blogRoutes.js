import express from 'express';
import { createBlogPost, getAllBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost, addComment, getAllComments, deleteComment } from '../controllers/blogController.js';
import { uploaded } from '../utils/multer.js';

const router = express.Router();

// POST request to create a blog post
router.post('/', uploaded, createBlogPost);

// GET request to get all blog posts
router.get('/', getAllBlogPosts);

// GET request to get a blog post by ID
router.get('/:id', getBlogPostById);

// PUT request to update a blog post
router.put('/:id', uploaded, updateBlogPost);

// DELETE request to delete a blog post
router.delete('/:id', deleteBlogPost);

// POST request to add a comment to a blog post
router.post('/:id/comments', addComment);

// GET request to get all comments for a blog post
router.get('/:id/comments', getAllComments);

// DELETE request to delete a comment from a blog post
router.delete('/:id/comments/:commentId', deleteComment);

export default router;
