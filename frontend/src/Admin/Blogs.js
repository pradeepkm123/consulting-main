import React, { useState, useEffect } from 'react';
import AddBlog from './AddBlog';
import './Dashboard.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Blogs() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogComments, setBlogComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch('https://consulting-4rbe.onrender.com/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch blogs');
        setBlogs([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setBlogs([]);
    }
  };

  const fetchBlogComments = async (blogId) => {
    try {
      const response = await fetch(`https://consulting-4rbe.onrender.com/api/blogComments/${blogId}`);
      if (response.ok) {
        const data = await response.json();
        setBlogComments(Array.isArray(data) ? data : []);
        setShowComments(true);
      } else {
        console.error('Failed to fetch blog comments');
        setBlogComments([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setBlogComments([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    toggleDrawer();
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await fetch(`https://consulting-4rbe.onrender.com/api/blogs/${blogId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Blog deleted successfully!');
          fetchBlogs();
        } else {
          toast.error('Failed to delete blog');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while deleting the blog');
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const response = await fetch(`https://consulting-4rbe.onrender.com/api/blogComments/${commentId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Comment deleted successfully!');
          fetchBlogComments(selectedBlog._id);
        } else {
          toast.error('Failed to delete comment');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while deleting the comment');
      }
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard-container">
      <div className="top-controls">
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="d-flex align-items-center gap-3">
              <button className="btn-add-product" onClick={() => {
                setSelectedBlog(null);
                toggleDrawer();
              }}>
                <i className="fas fa-plus"></i>
                Add Blog
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="products-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.map((blog) => (
                <tr key={blog._id}>
                  <td>{blog.title}</td>
                  <td>
                    {blog.imageUrl ? (
                      <img
                        src={`https://consulting-4rbe.onrender.com/${blog.imageUrl}`}
                        alt={blog.title}
                        style={{ width: '100px', height: 'auto' }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>

                  <td>{new Date(blog.date).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-edit" onClick={() => handleEdit(blog)}>
                        <i className="fas fa-edit"></i>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(blog._id)}>
                        <i className="las la-trash"></i>
                      </button>
                      <button className="btn-view" onClick={() => {
                        setSelectedBlog(blog);
                        fetchBlogComments(blog._id);
                      }}>
                        <i className="las la-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination-container">
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous" onClick={() => paginate(currentPage - 1)}>
                <i className="las la-angle-left"></i>
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <a className="page-link" href="#" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next" onClick={() => paginate(currentPage + 1)}>
                <i className="las la-angle-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {showComments && (
        <div className="comments-table">
          <h3>Comments for {selectedBlog.title}</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Author</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogComments.map((comment) => (
                <tr key={comment._id}>
                  <td>{comment.author}</td>
                  <td>{comment.text}</td>
                  <td>{new Date(comment.date).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDeleteComment(comment._id)}>
                      <i className="las la-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isDrawerOpen && (
        <AddBlog
          isOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          onBlogSubmit={fetchBlogs}
          blog={selectedBlog}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default Blogs;
