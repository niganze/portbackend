import Blog from '../models/Blog.js';

// Create new blog post
export const createBlogPost = async (req, res) => {
  const { title, description, image, owner } = req.body;

  if (!title || !description || !image || !owner) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  try {
    const blogPost = new Blog({ title, description, image, owner });
    const savedPost = await blogPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post' });
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
  const { title, description, image, owner } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.image = image || blog.image;
    blog.owner = owner || blog.owner;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog post' });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    await blog.remove();
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
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
