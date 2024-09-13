import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { check } from 'express-validator';
import passport from 'passport';

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

// Route to initiate Google login
router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  // Route for Google callback
router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/api/success',
      failureRedirect: '/api/failure',
    })
  );


  // Route to log out the user
router.get('/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
  
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
