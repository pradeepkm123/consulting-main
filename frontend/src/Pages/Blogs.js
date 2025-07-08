import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import FloatingButtons from '../Components/FloatingButtons';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://consulting-4rbe.onrender.com/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(Array.isArray(data) ? data : []);
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mt-5">
            <div className="section_title text-center">
              <h4>FEATURED BLOGS</h4>
              <h1>Unlimited Possibilities</h1>
            </div>
          </div>
        </div>
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-lg-4" key={blog._id}>
              <div className="service_single_item style_two style_three">
                <div className="service_thumb">
                  <img src={`https://consulting-4rbe.onrender.com/${blog.imageUrl}`} alt={blog.title} style={{width:'100%'}} />
                </div>
                <div className="service_content">
                  <h3>{new Date(blog.date).toLocaleDateString()}</h3>
                  <p>{blog.title}</p>
                  <div className="service_btn">
                    <Link to={`/blog/${blog._id}`}>View Details <i className="las la-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FloatingButtons/>
      <Footer />
    </div>
  );
}

export default Blogs;
