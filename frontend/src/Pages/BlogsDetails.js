import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FloatingButtons from '../Components/FloatingButtons';

function BlogsDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://consulting-4rbe.onrender.com/api/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
        } else {
          console.error('Failed to fetch blog details');
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-5">Blog details not found.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="breadcumb-area d-flex">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              <div className="breadcumb-content">
                <div className="breadcumb-title style_two">
                  <h4>Blogs Details</h4>
                </div>
                <ul>
                  <li><a href="/"><i className="las la-home"></i> Home </a></li>
                  <li className="rotates"><i className="las la-slash"></i> Blogs</li>
                  <li className="rotates"><i className="las la-slash"></i> Blogs Details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="portfolio_details">
        <div className="container">
          <div className="port_main">
            <div className="row pt-40">
              <div className="col-lg-10 offset-md-1">
                <div className="port_details_content style_two">
                  <h2>{blog.title}</h2>
                </div>
                <div className="row pt-32">
                  <div className="col-lg-12 col-md-6">
                    <div className="port_details_thumb">
                      <img src={`https://consulting-4rbe.onrender.com/${blog.imageUrl}`} alt={blog.title} style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
                <div className="port_details_content style_two three mt-3">
                  <p><strong>Date:</strong> {new Date(blog.date).toLocaleDateString()}</p>
                  <p>{blog.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FloatingButtons/>
      <Footer />
    </div>
  );
}

export default BlogsDetails;
