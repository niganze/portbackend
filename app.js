import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js'; // Contact routes
import projectRoutes from './routes/projectRoutes.js'; // Project routes
import blogRoutes from './routes/blogRoutes.js'; // Blog routes

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api', contactRoutes); // Contact routes
app.use('/api/projects', projectRoutes); // Project routes
app.use('/api/blogs', blogRoutes); // Blog routes

// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
