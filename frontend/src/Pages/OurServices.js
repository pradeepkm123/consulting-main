import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FloatingButtons from '../Components/FloatingButtons';

function OurServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('https://consulting-main.onrender.com/api/services');
                if (response.ok) {
                    const data = await response.json();
                    setServices(Array.isArray(data) ? data : []);
                } else {
                    console.error('Failed to fetch services');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchServices();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="breadcumb-area d-flex mt-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 text-center">
                            <div className="breadcumb-content">
                                <div className="breadcumb-title">
                                    <h4>Our Service</h4>
                                </div>
                                <ul>
                                    <li><a href="/"><i className="las la-home"></i> Home </a></li>
                                    <li className="rotates"><i className="las la-slash"></i>Service</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="feature_area boxed">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section_title text-center">
                                <h4>FEATURED SERVICE</h4>
                                <h1>Unlimited Possibilities</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {loading ? ( // Show spinner if loading
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            services.map((service, index) => (
                                <div key={service._id} className="col-lg-3 col-md-6">
                                    <div className={`feature_item ${index % 2 === 1 ? 'upper' : ''}`} style={{ padding: '20px 20px 20px 20px' }}>
                                        <div className="feature_icon">
      <img
      src={service.imageUrl}
      alt={service.title}
      style={{ width: '100px', height: 'auto' }}
    />
                                        </div>
                                        <div className="feature_content">
                                            <h3>{service.title}</h3>
                                            {/* <p>{service.description}</p> */}
                                        </div>
                                        <div className="feature_number">
                                            <Link to={`/service/${service._id}`}>
                                                <i className="las la-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="feature_shape bounce-animate-3">
                    <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_3/boxs.png" alt="Feature Shape" />
                </div>
            </section>
            <FloatingButtons />
            <Footer />
        </div>
    );
}

export default OurServices;
