// // const Blog = require('../models/Blog');

// // // Get all blogs
// // exports.getAllBlogs = async (req, res) => {
// //   try {
// //     const blogs = await Blog.find();
// //     res.json(blogs);
// //   } catch (err) {
// //     console.error('Error fetching blogs:', err);
// //     res.status(500).json({ message: 'Server Error', error: err.message });
// //   }
// // };

// // // Add a new blog
// // exports.addBlog = async (req, res) => {
// //   try {
// //     const { title, date, description, conclusion } = req.body;
// //     const imageUrl = req.file ? req.file.path : '';

// //     if (!imageUrl) {
// //       return res.status(400).json({ message: 'Image is required.' });
// //     }
// //     if (!conclusion) {
// //       return res.status(400).json({ message: 'Conclusion is required.' });
// //     }

// //     const newBlog = new Blog({
// //       title,
// //       date,
// //       imageUrl,
// //       description,
// //       conclusion,
// //     });

// //     const blog = await newBlog.save();
// //     res.status(201).json(blog);
// //   } catch (err) {
// //     console.error('Error adding blog:', err);
// //     res.status(500).json({ message: 'Server Error', error: err.message });
// //   }
// // };

// // // Update an existing blog
// // exports.updateBlog = async (req, res) => {
// //   try {
// //     const { title, date, description, conclusion } = req.body;
// //     const imageUrl = req.file ? req.file.path : req.body.imageUrl;

// //     if (!imageUrl) {
// //       return res.status(400).json({ message: 'Image is required.' });
// //     }
// //     if (!conclusion) {
// //       return res.status(400).json({ message: 'Conclusion is required.' });
// //     }

// //     const updatedBlog = await Blog.findByIdAndUpdate(
// //       req.params.id,
// //       { title, date, imageUrl, description, conclusion },
// //       { new: true }
// //     );

// //     if (!updatedBlog) {
// //       return res.status(404).json({ message: 'Blog not found.' });
// //     }

// //     res.json(updatedBlog);
// //   } catch (err) {
// //     console.error('Error updating blog:', err);
// //     res.status(500).json({ message: 'Server Error', error: err.message });
// //   }
// // };

// // // Delete a blog
// // exports.deleteBlog = async (req, res) => {
// //   try {
// //     const deleted = await Blog.findByIdAndDelete(req.params.id);
// //     if (!deleted) {
// //       return res.status(404).json({ message: 'Blog not found.' });
// //     }
// //     res.json({ message: 'Blog deleted successfully.' });
// //   } catch (err) {
// //     console.error('Error deleting blog:', err);
// //     res.status(500).json({ message: 'Server Error', error: err.message });
// //   }
// // };

// const Blog = require('../models/Blog');

// // Get all blogs
// exports.getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find();
//     res.json(blogs);
//   } catch (err) {
//     console.error('Error fetching blogs:', err);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// // ✅ Get single blog by ID
// exports.getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ message: 'Blog not found.' });
//     }
//     res.json(blog);
//   } catch (err) {
//     console.error('Error fetching blog by ID:', err);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// // Add a new blog
// exports.addBlog = async (req, res) => {
//   try {
//     const { title, date, description, conclusion } = req.body;
//     const imageUrl = req.file ? req.file.path : '';

//     if (!imageUrl) {
//       return res.status(400).json({ message: 'Image is required.' });
//     }
//     if (!conclusion) {
//       return res.status(400).json({ message: 'Conclusion is required.' });
//     }

//     const newBlog = new Blog({
//       title,
//       date,
//       imageUrl,
//       description,
//       conclusion,
//     });

//     const blog = await newBlog.save();
//     res.status(201).json(blog);
//   } catch (err) {
//     console.error('Error adding blog:', err);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// // Update an existing blog
// exports.updateBlog = async (req, res) => {
//   try {
//     const { title, date, description, conclusion } = req.body;
//     const imageUrl = req.file ? req.file.path : req.body.imageUrl;

//     if (!imageUrl) {
//       return res.status(400).json({ message: 'Image is required.' });
//     }
//     if (!conclusion) {
//       return res.status(400).json({ message: 'Conclusion is required.' });
//     }

//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { title, date, imageUrl, description, conclusion },
//       { new: true }
//     );

//     if (!updatedBlog) {
//       return res.status(404).json({ message: 'Blog not found.' });
//     }

//     res.json(updatedBlog);
//   } catch (err) {
//     console.error('Error updating blog:', err);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// // Delete a blog
// exports.deleteBlog = async (req, res) => {
//   try {
//     const deleted = await Blog.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({ message: 'Blog not found.' });
//     }
//     res.json({ message: 'Blog deleted successfully.' });
//   } catch (err) {
//     console.error('Error deleting blog:', err);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };





























const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }
    res.json(blog);
  } catch (err) {
    console.error('Error fetching blog by ID:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Add a new blog
// @route   POST /api/blogs
exports.addBlog = async (req, res) => {
  try {
    const { title, date, description, conclusion, sections, contentSets } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image is required.' });
    }

    const parsedSections = JSON.parse(sections || '[]');
    const parsedContentSets = JSON.parse(contentSets || '[]');

    const newBlog = new Blog({
      title,
      date,
      imageUrl,
      description,
      conclusion,
      sections: parsedSections,
      contentSets: parsedContentSets,
    });

    const blog = await newBlog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error('Error adding blog:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Update an existing blog
// @route   PUT /api/blogs/:id
exports.updateBlog = async (req, res) => {
  try {
    const { title, date, description, conclusion, sections, contentSets } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image is required.' });
    }

    const parsedSections = JSON.parse(sections || '[]');
    const parsedContentSets = JSON.parse(contentSets || '[]');

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        date,
        imageUrl,
        description,
        conclusion,
        sections: parsedSections,
        contentSets: parsedContentSets,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    res.json(updatedBlog);
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Blog not found.' });
    }
    res.json({ message: 'Blog deleted successfully.' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
