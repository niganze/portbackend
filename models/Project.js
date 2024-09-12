import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true, // URL for project image
  },
  techStack: {
    type: [String], // Array of technologies used
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
