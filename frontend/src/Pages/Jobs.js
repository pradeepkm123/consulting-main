import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import './Job.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FloatingButtons from '../Components/FloatingButtons';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('https://consulting-main.onrender.com/api/jobs');
                if (response.ok) {
                    const data = await response.json();
                    setJobs(Array.isArray(data) ? data : []);
                } else {
                    console.error('Failed to fetch jobs');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const getCategoryIcon = (category) => {
        const icons = {
            'Retail': 'las la-store-alt',
            'Real Estate': 'las la-city',
            'Pharmaceuticals': 'las la-clinic-medical',
            'FMCG': 'las la-shopping-basket',
            'Electric Vehicles (EV)': 'las la-car',
            'Technology': 'las la-laptop-code',
            'Manufacturing': 'las la-industry',
            'Hospitality': 'las la-concierge-bell',
            'Interior Design': 'las la-paint-roller',
            'Audit & Finance': 'las la-file-invoice-dollar',
            'Automobile': 'las la-car',
            'Banking & Finance': 'las la-piggy-bank',
            'Hotel': 'las la-hotel',
            'EdTech': 'las la-graduation-cap',
            'Logistics': 'las la-truck',
            'Television': 'las la-tv',
            'Malls & Super Market': 'las la-shopping-bag',
            'Healthcare': 'las la-heartbeat',
            'Telecom': 'las la-phone-alt',
            'Power & Energy': 'las la-bolt',
            'Oil & Gas': 'las la-gas-pump',
            'Event Management': 'las la-calendar-alt',
            'Fintech': 'las la-mobile-alt',
            'E-commerce': 'las la-shopping-cart',
            'Gold & Diamonds': 'las la-gem',
            'Apparels': 'las la-tshirt',
            'Electronics & Digital Products': 'las la-mobile'
        };
        return icons[category] || 'las la-briefcase';
    };

    const getThemeColor = (index) => {
        const colors = ['purple-theme', 'pink-theme', 'yellow-theme', 'blue-theme', 'green-theme'];
        return colors[index % colors.length];
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleApplyNow = (job) => {
        navigate(`/job/${job._id}`, { state: { job } });
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    const categoryCounts = jobs.reduce((acc, job) => {
        const category = job.jobCategory;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category]++;
        return acc;
    }, {});

    const categoryEntries = Object.entries(categoryCounts);

    const filteredJobs = selectedCategory
        ? jobs.filter(job => job.jobCategory === selectedCategory)
        : jobs;

    return (
        <div>
            <Navbar />
            <div className="breadcumb-area d-flex mt-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 text-center">
                            <div className="breadcumb-content">
                                <div className="breadcumb-title">
                                    <h4 style={{ margin: '0' }}>Jobs</h4>
                                </div>
                                <ul style={{ listStyle: 'none', padding: '0' }}>
                                    <li style={{ display: 'inline', marginRight: '10px' }}><a href="index.html" style={{ textDecoration: 'none' }}><i className="las la-home"></i> Home </a></li>
                                    <li className="rotates" style={{ display: 'inline' }}><i className="las la-slash"></i> Jobs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-container" style={{ padding: '20px' }}>
                <div className="header-section" style={{ marginBottom: '20px' }}>
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                        <div>
                            <h1 className="page-title" style={{ margin: '0' }}>Recommended Jobs</h1>
                            <p className="page-subtitle" style={{ margin: '0' }}>Explore Suggested job searches</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className="sidebar" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
                            <h3 className="sidebar-title" style={{ marginTop: '0' }}>Jobs Categories</h3>
                            {categoryEntries.map(([category, count]) => (
                                <div
                                    className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    style={{ padding: '10px', cursor: 'pointer' }}
                                >
                                    <div className="category-left" style={{ display: 'flex', alignItems: 'center' }}>
                                        <i className={getCategoryIcon(category)} style={{ marginRight: '10px' }}></i>
                                        <span className="category-name">{category}</span>
                                    </div>
                                    <span className="category-count">{count} Opening{count !== 1 ? 's' : ''}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8">
                        <div className="jobs-section">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job, index) => (
                                    <div className={`job-card ${getThemeColor(index)}`} key={job._id} style={{ marginBottom: '20px', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                        <div className="job-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div className="job-meta">
                                                <span style={{ marginRight: '10px' }}>Type: {job.jobType}</span>
                                                <span>Uploaded: {formatDate(job.createdAt)}</span>
                                            </div>
                                        </div>

                                        <div className="job-icon-section" style={{ textAlign: 'center', margin: '20px 0' }}>
                                            <div className={`job-icon ${getThemeColor(index).split('-')[0]}`} style={{ display: 'inline-block', padding: '10px', borderRadius: '50%', backgroundColor: '#e9ecef' }}>
                                                <i className={getCategoryIcon(job.jobCategory)}></i>
                                            </div>
                                        </div>

                                        <div className="job-title" style={{ fontSize: '24px', margin: '10px 0' }}>{job.positionName}</div>
                                        <div className="job-salary" style={{ fontSize: '20px', color: '#28a745', margin: '10px 0' }}>{job.salary}</div>

                                        <div className="job-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div className="job-tags">
                                                <div className="job-tag" style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                                                    <div className="tag-icon location-icon" style={{ marginRight: '5px' }}>
                                                        <i className="las la-map-marker-alt"></i>
                                                    </div>
                                                    <span>{job.jobLocation}</span>
                                                </div>
                                                <div className="job-tag" style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                                                    <div className="tag-icon category-tag-icon" style={{ marginRight: '5px' }}>
                                                        <i className="fas fa-building"></i>
                                                    </div>
                                                    <span>{job.jobCategory}</span>
                                                </div>
                                            </div>
                                            <button className="apply-btn" onClick={() => handleApplyNow(job)} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Apply Now</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ textAlign: 'center' }}>No jobs available for the selected category.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <FloatingButtons />
            <Footer />
        </div>
    );
}

export default Jobs;
