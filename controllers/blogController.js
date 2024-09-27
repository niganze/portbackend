import Blog from '../models/Blog.js';
import uploadCloudinary from '../utils/cloudinary.js';


// Create new blog post
export const createBlogPost = async (req, res) => {
  const { title, description, owner } = req.body;

  if (!title || !description || !owner) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  // Check if there's an image uploaded
  if (!req.files || !req.files.image || req.files.image.length === 0) {
    return res.status(400).json({ message: 'Please upload an image.' });
  }

  try {

    const imageUrl = await uploadCloudinary(req.files.image[0]);
    
    
    // Create the blog post with the image URL from Cloudinary
    const blogPost = new Blog({
      title,
      description,
      image: imageUrl, 
      owner,
    });

    const savedPost = await blogPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
     console.log('error creating blog posts', error);
     
    res.status(500).json({ message: 'Error creating blog post', error:error.message });
  }
};


// Get all blog posts
export const getAllBlogPosts = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts' });
  }
};

// Get a blog post by ID
export const getBlogPostById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('comments');
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    // Increment view count
    blog.views += 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog post' });
  }
};

// Update a blog post
export const updateBlogPost = async (req, res) => {
  const { title, description,  owner } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.owner = owner || blog.owner;

       // Check if there's a new image uploaded
    if (req.files && req.files.image && req.files.image.length > 0) {
      // Upload the new image to Cloudinary
      const imageUrl = await uploadCloudinary(req.files.image[0]);

      // Replace the old image with the new one
      blog.image = imageUrl;
    }

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog post' });
  }
};

// Delete a blog post
// Delete a blog post
export const deleteBlogPost = async (req, res) => {
  try {
    // Use findByIdAndDelete for direct deletion
    const blog = await Blog.findByIdAndDelete(req.params.id);

    // If the blog post is not found
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Successful deletion
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    // Log error to understand more
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: 'Error deleting blog post' });
  }
};

// Add a comment to a blog post
export const addComment = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const comment = { name, email, subject, message };
    blog.comments.push(comment);

    const updatedBlog = await blog.save();
    res.status(201).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
};

// Get all comments for a blog post
export const getAllComments = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blog.comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

// Delete a comment from a blog post
export const deleteComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const commentIndex = blog.comments.findIndex(c => c._id.equals(req.params.commentId));
    if (commentIndex === -1) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    blog.comments.splice(commentIndex, 1);
    await blog.save();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
};
