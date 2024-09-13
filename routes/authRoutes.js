import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { check } from 'express-validator';

const router = express.Router();

// Signup Route
router.post(
  '/signup',
  [
    check('fullname', 'Fullname is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6,
    }),
  ],
  signup
);

// Login Route
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

export default router;
