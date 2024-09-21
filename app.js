import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import passport from 'passport';
import session from 'express-session';
import { googleStrategy } from './config/passport.js'; 
import authRoutes from './routes/authRoutes.js';
import cors from "cors";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
const corsOptions = {
  origin: [
    "http://localhost:5173/",
    "https://port1-dun.vercel.app/",
    
  ],
  optionsSuccessStatus: 200,
  credentials: true,
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Google Strategy
googleStrategy(passport);

// Use routes
app.use('/api', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);

app.use(authRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
