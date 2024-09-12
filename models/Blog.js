import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
}, {
  timestamps: true
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Image URL
  date: { type: Date, default: Date.now }, // Post date
  views: { type: Number, default: 0 }, // View count
  owner: { type: String, required: true }, // Owner's name
  comments: [commentSchema], // Array of comments
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
