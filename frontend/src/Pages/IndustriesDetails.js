import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import FloatingButtons from '../Components/FloatingButtons';

function IndustriesDetails() {
    const { id } = useParams();
    const [industry, setIndustry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = 'https://consulting-main.onrender.com'; // Change this for production

    useEffect(() => {
        const fetchIndustryDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/industries/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch industry details');
                }
                const data = await response.json();
                setIndustry(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIndustryDetails();
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!industry) {
        return <div>No industry data found</div>;
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
                                    <h4>Industries Details</h4>
                                </div>
                                <ul>
                                    <li><a href="/"><i className="las la-home"></i> Home </a></li>
                                    <li className="rotates"><i className="las la-slash"></i>Industries Details</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="portfolio_details">
                <div className="container">
                    <div className="port_main style_two">
                        <div className="row">
                            <h2>{industry.title}</h2>
                            <div className="col-lg-6">
                                <div className="port_details_content style_two">
                                    <p className="quote">{industry.description}</p>
                                    <p>{industry.subtitle}</p>
                                    {industry.contentSets && industry.contentSets[0] && (
                                        <div>
                                            <h5>{industry.contentSets[0].heading}</h5>
                                            <p>{industry.contentSets[0].paragraph}</p>
                                        </div>
                                    )}

                                </div>
                            </div>
                            <div className="col-lg-6" style={{ padding: '20px' }}>
                                <div className="quote">
                                    {industry.imageUrl && (
                                        <img
                                            src={`https://consulting-main.onrender.com/uploads/${industry.imageUrl.split('\\').pop()}`}
                                            alt={industry.title}
                                            style={{ width: '100%', borderRadius: '15px' }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="port_details_content style_two">
                                    <h2 className="pb-15">How we help you?</h2>
                                    {industry.contentSets &&
                                        industry.contentSets
                                            .filter((_, index) => index !== 0)
                                            .map((content, index) => (
                                                <div key={index}>
                                                    <h5>{content.heading}</h5>
                                                    <p>{content.paragraph}</p>
                                                </div>
                                            ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FloatingButtons />
            <Footer />
        </div>
    );
}

export default IndustriesDetails;
