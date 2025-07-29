import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../Components/Footer';
import ClientSlider from './ClientSlider';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FloatingButtons from '../Components/FloatingButtons';
import logo from '../logo1.png';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

// Counter Component
const Counter = ({ end, suffix }) => {
    return <h1 className="counter"><CountUp end={end} suffix={suffix} /></h1>;
};

function Home() {
    const [loading, setLoading] = useState(true);
    const [counterData, setCounterData] = useState({ clients: 0, placements: 0, experience: 0 });
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [blogsLoading, setBlogsLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState(null);

    const texts = [
        "Payroll Company",
        "Recruitment Agency",
        "Staffing Provider",
        "Job Consultant",
        "Manpower Agency"
    ];

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleMenuItem = (item) => setActiveMenuItem(activeMenuItem === item ? null : item);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);

        const fetchCounterData = async () => {
            try {
                const response = await axios.get('https://consulting-main.onrender.com/api/counter');
                setCounterData(response.data);
            } catch (error) {
                console.error('Error fetching counter data:', error);
            }
        };

        const fetchServices = async () => {
            try {
                const response = await axios.get('https://consulting-main.onrender.com/api/services');
                setServices(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setServicesLoading(false);
            }
        };

        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://consulting-main.onrender.com/api/blogs');
                setBlogs(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setBlogsLoading(false);
            }
        };

        fetchCounterData();
        fetchServices();
        fetchBlogs();

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [texts.length]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <div className="consalt-header-area upper" id="sticky-header mob">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-2 pt-10">
                            <div className="header-logo">
                                <a href="/"><img src={logo} alt="logo" width={150} /></a>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="header-menu">
                                <ul className="nav_scroll">
                                    <li><a href="#">Home <span></span></a></li>
                                    <li><a href="/about">About</a></li>
                                    <li><a href="/services">Our Services <span></span></a></li>
                                    <li><a href="#">Pages <span><i className="las la-angle-down"></i></span></a>
                                        <ul className="sub_menu">
                                            <li><a href="/internship">Internship</a></li>
                                            <li><a href="/team">Our Team</a></li>
                                            <li><a href="/jobs">Job</a></li>
                                            <li><a href="/resume">Submit Resume</a></li>
                                            <li><a href="/">Admin Login</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="/industries">Industries <span></span></a></li>
                                    <li><a href="/blogs">Blogs <span></span></a></li>
                                    <li><a href="/contact">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 pt-10"></div>
                    </div>
                </div>
            </div>

            <div className={`mobile-menu-area sticky d-sm-block d-md-block d-lg-none ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu mean-container">
                    <div className="mean-bar">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <a className="active_sticky" href="/">
                                <img src={logo} alt="logo" width={100} />
                            </a>
                            <a href="#nav" className="meanmenu-reveal" onClick={toggleMobileMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </a>
                        </div>
                        <nav className="mean-nav">
                            <ul className="nav_scroll" style={{ display: isMobileMenuOpen ? 'block' : 'none' }}>
                                <li><a href="#" onClick={() => toggleMenuItem('home')}>Home</a></li>
                                <li><a href="about.html">About</a></li>
                                <li>
                                    <a href="#" onClick={() => toggleMenuItem('services')}>Our Services <span><i className="las la-angle-down"></i></span></a>
                                    {activeMenuItem === 'services' && (
                                        <ul className="sub_menu">
                                            <li><a href="/services">Service</a></li>
                                            <li><a href="/internship">Internship</a></li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <a href="#" onClick={() => toggleMenuItem('pages')}>Page <span><i className="las la-angle-down"></i></span></a>
                                    {activeMenuItem === 'pages' && (
                                        <ul className="sub_menu">
                                            <li><a href="/about">About Us</a></li>
                                            <li><a href="/team">Our Team</a></li>
                                            <li><a href="/jobs">Job</a></li>
                                            <li><a href="/resume">Submit Resume</a></li>
                                            <li><a href="/">Admin Login</a></li>
                                        </ul>
                                    )}
                                </li>
                                <li><a href="/industries">Industries</a></li>
                                <li><a href="/blogs">Blogs</a></li>
                                <li className="mean-last"><a href="/contact">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <section className="hero_area d-flex align-items-center boxed">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="hero_content">
                                <span style={{ color: '#fff', fontWeight: '500', fontSize: '18px' }}>HR Consultancy Services</span>
                                <h4 style={{ color: '#fff', fontSize: '40px' }}>We are <span style={{ color: '#ffcf40' }}>{texts[currentTextIndex]}</span></h4>
                                <p>At Future Solutions, we take pride in being one of India’s leading recruitment agencies.
                                    Our approach goes beyond traditional hiring — we invest time in understanding your company’s culture, values, and unique talent needs. We are dedicated to empowering both employers and job seekers, fostering long-term partnerships that drive mutual growth and success.</p>
                                <div className="slider_button">
                                    <div className="hero_btn">
                                        <a href="/about">More About <span></span></a>
                                    </div>
                                    <div className="slider_info">
                                        <span>
                                            <i className="las la-envelope" style={{ fontSize: '20px' }}></i>
                                            <a href="mailto:hr@futuresolutionsco.com" style={{ marginLeft: '5px', textDecoration: 'none', color: 'inherit' }}>
                                                Mail To: hr@futuresolutionsco.com
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-thumb">
                                <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_one/hero_thumb.png" alt="Hero" />
                                <div className="video-icon">
                                    <a className="video-vemo-icon venobox vbox-item" data-vbtype="youtube" data-autoplay="true" href="https://youtu.be/BS4TUd7FJSg"><i className="las la-cog"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero_shape testi-shapes">
                    <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_one/hero_shape.png" alt="Shape" />
                </div>
            </section>

            <section className="about_area boxed">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="about_thumb">
                                <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_one/about_thumb.png" alt="About" />
                                <div className="about_play">
                                    <a data-aos="flip-left" className="banner-play-btn">
                                        <div className="text-inner">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="250.5" height="250.5" viewBox="0 0 250.5 250.5">
                                                <path d="M.25,125.25a125,125,0,1,1,125,125,125,125,0,0,1-125-125" id="e-path-35ee1b2"></path>
                                                <text>
                                                    <textPath href="#e-path-35ee1b2" startOffset="0%">BUSINESS * CONSULTANT * MARKETING * VISIONS *</textPath>
                                                </text>
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="about_content">
                                <h3>ABOUT COMPANY</h3>
                                <h1>We have dedicated HR teams to cater to the needs of each industry sector</h1>
                                <p>Future Solutions, established in 2015, has swiftly emerged as a leading name in the field of human resources and talent acquisition...</p>
                                <div className="about_list">
                                    <ul>
                                        <li><i className="las la-check-double"></i>We are Job Consultant</li>
                                        <li><i className="las la-check-double"></i>We are Recruitment Agency</li>
                                        <li><i className="las la-check-double"></i>We are Staffing Provider</li>
                                        <li><i className="las la-check-double"></i>We are Manpower Agency</li>
                                    </ul>
                                </div>
                                <div className="about_shape">
                                    <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_one/about_shpe.png" alt="About Shape" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="service_area boxed" style={{ padding: '45px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section_title text-center style_two">
                                <h4>FEATURED SERVICE</h4>
                                <h1>Unlimited Possibilities</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {servicesLoading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <Slider {...sliderSettings}>
                                {services.map((service) => (
                                    <div key={service._id} className="col-lg-4 col-md-6">
                                        <div className="service_single_item">
                                            <div className="service_thumb">
                                                <img
                                                    src={`https://consulting-main.onrender.com/uploads/${service.imageUrl}`}
                                                    alt={service.title}
                                                    style={{ width: '100%', borderRadius: '10px' }}
                                                />

                                            </div>
                                            <div className="service_content">
                                                <h3>{service.title}</h3>
                                                <div className="service_btn">
                                                    <Link to={`/service/${service._id}`}>
                                                        Read More <i className="las la-long-arrow-alt-right"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                </div>
            </section>


            <section className="counter_area boxed">
                <div className="container">
                    <div className="counter_upper">
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <div className="section_title style_two">
                                    <h5 style={{ color: '#fdff41' }}>Industry expert consultant</h5>
                                    <h1>We help industries to get skilled candidates</h1>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="consalt_btn text-right">
                                    <Link to="/industries">View more <span></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="counter-single-item">
                                <div className="counter-content none">
                                    <div className="counter-_number">
                                        <Counter end={counterData.clients} />
                                    </div>
                                    <div className="counter_title">
                                        <h5>Total <br /> CLIENTS</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="counter-single-item">
                                <div className="counter-content">
                                    <div className="counter-_number">
                                        <Counter end={counterData.placements} suffix="+" />
                                    </div>
                                    <div className="counter_title">
                                        <h5>Placements</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="counter-single-item">
                                <div className="counter-content">
                                    <div className="counter-_number">
                                        <Counter end={counterData.experience} suffix="*" />
                                    </div>
                                    <div className="counter_title">
                                        <h5>Years of <br />Experience</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="case-study-area boxed">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section_title text-center">
                                <h4>LATEST Blogs</h4>
                                <h1>Recently We’ve Finished those works</h1>
                                <h1>With highly Satisfaction</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {blogsLoading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <Slider {...sliderSettings}>
                                {blogs.map((blog) => (
                                    <div key={blog._id} className="col-lg-12">
                                        <div className="case-study-single-box">
                                            <div className="case-study-thumb">
                                                <img src={`https://consulting-main.onrender.com/uploads/${blog.imageUrl}`} alt={blog.title} />
                                                <div className="single_portfolio_icon">
                                                    <a href={`/blog/${blog._id}`}><i className="las la-arrow-right"></i></a>
                                                </div>
                                                <div className="case-study-content">
                                                    <h3><a href={`/blog/${blog._id}`}>{blog.title}</a></h3>
                                                    <p>{blog.category}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                </div>
            </section>

            <section className="brand_area">
                <ClientSlider />
            </section>

            <FloatingButtons />
            <Footer />
        </div>
    );
}

export default Home;
