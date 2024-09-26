import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: [String],
    required: false, // URL for project image
  },
  techStack: {
    type: [String], // Array of technologies used
    required: false,
  },
}, {
  timestamps: false, // adds createdAt and updatedAt fields
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
