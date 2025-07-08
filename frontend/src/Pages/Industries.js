import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import FloatingButtons from '../Components/FloatingButtons';

function Industries() {
    const [industries, setIndustries] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const BASE_URL = 'https://consulting-4rbe.onrender.com'; // Change this for production

    const fetchIndustries = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/industries`);
            if (response.ok) {
                const data = await response.json();
                setIndustries(Array.isArray(data) ? data : []);
            } else {
                console.error('Failed to fetch industries');
                setIndustries([]);
            }
        } catch (error) {
            console.error('Error:', error);
            setIndustries([]);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        fetchIndustries();
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
            <div className="breadcumb-area d-flex mt-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 text-center">
                            <div className="breadcumb-content">
                                <div className="breadcumb-title">
                                    <h4>Industries</h4>
                                </div>
                                <ul>
                                    <li><a href="/"><i className="las la-home"></i> Home </a></li>
                                    <li className="rotates"><i className="las la-slash"></i>Industries</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="blog_area inner_page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section_title text-center">
                                <h2>Industries</h2>
                                <p>
                                    At Future Solutions, our commitment to excellence extends across a diverse array of industries. We pride ourselves on delivering customized workforce solutions tailored to meet the unique demands and challenges of each sector we serve.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {industries.map((industry) => (
                            <div key={industry._id} className="col-lg-4 col-md-6">
                                <div className="single-blog-box">
                                    <div className="single-blog-thumb">
                                        <img
                                            src={`https://consulting-4rbe.onrender.com/uploads/${industry.imageUrl}`}
                                            alt={industry.title}
                                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                        />

                                    </div>
                                    <div className="blog-content">
                                        <div className="meta-blog">
                                            <p><span className="solution">{industry.title}</span>{new Date(industry.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="blog-title">
                                            <h3><a href={`/blog-details/${industry._id}`}>{industry.subtitle}</a></h3>
                                        </div>
                                        <div className="blog_btn">
                                            <Link to={`/industries/${industry._id}`}>
                                                Read More <i className="las la-long-arrow-alt-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <FloatingButtons />
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default Industries;
