import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FloatingButtons from '../Components/FloatingButtons';

function About() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    // Simulate loading data
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulate loading for 1 second

        return () => clearTimeout(timer);
    }, []);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "How to Install Booking Plugin on WP?",
            answer: "Dramatically harness cross-platform best practices whereas business services. Conveniently formula standards in innovation with wireless Globally engage cross-media leadership best breed experience rather than bricks-and-clicks infomediaries monotonectally"
        },
        {
            question: "What is the Best Extension for Marketing?",
            answer: "Dramatically harness cross-platform best practices whereas business services. Conveniently formula standards in innovation with wireless Globally engage cross-media leadership best breed experience rather than bricks-and-clicks infomediaries monotonectally"
        },
        {
            question: "Do You have any custom Service?",
            answer: "Dramatically harness cross-platform best practices whereas business services. Conveniently formula standards in innovation with wireless Globally engage cross-media leadership best breed experience rather than bricks-and-clicks infomediaries monotonectally"
        },
        {
            question: "How to Change my Username from cPanel?",
            answer: "Dramatically harness cross-platform best practices whereas business services. Conveniently formula standards in innovation with wireless Globally engage cross-media leadership best breed experience rather than bricks-and-clicks infomediaries monotonectally"
        }
    ];

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
            <div className="breadcumb-area d-flex">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 text-center">
                            <div className="breadcumb-content">
                                <div className="breadcumb-title">
                                    <h4>About Us</h4>
                                </div>
                                <ul>
                                    <li><a href="index.html"><i className="las la-home"></i> Home </a></li>
                                    <li className="rotates"><i className="las la-slash"></i>About Us</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="about_area style_two">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="about_thumb">
                                <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_two/about_2.png" alt="About Us" />
                                <div className="about_play style_two">
                                    <a data-aos="flip-left" className="banner-play-btn">
                                        <div className="text-inner">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="250.5" height="250.5" viewBox="0 0 250.5 250.5">
                                                <path d="M.25,125.25a125,125,0,1,1,125,125,125,125,0,0,1-125-125" id="e-path-35ee1b2"></path>
                                                <text>
                                                    <textPath id="e-text-path-35ee1b2" href="#e-path-35ee1b2" startOffset="0%">
                                                        FINANCE CONSULT  *  BUSINESS CONST  *  AGENCY 2024  *
                                                    </textPath>
                                                </text>
                                            </svg>
                                        </div>
                                        <div className="like">
                                            <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_two/like.png" alt="Like" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="section_title">
                                <h4> About Us</h4>
                                <h1>Who we are?</h1>
                                <p>At Future Solution, we are driven by a single mission — to deliver innovative, future-ready solutions that empower individuals, businesses, and communities to thrive in a rapidly evolving world.</p>
                                <p>Founded with a vision to redefine possibilities, we bring together deep industry knowledge, cutting-edge technology, and a passion for excellence. Whether it's consulting, digital transformation, talent solutions, or technology integration, our team is committed to providing end-to-end services that create real value for our clients.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about_shape two">
                    <img src="assets/images/home_two/about_shape2.png" alt="Shape" />
                </div>
            </section>
            <section className="steps_area boxed">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section_title text-center">
                                <h4>Our Vision & Mission</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="steps-single-item">
                                <div className="steps_icon">
                                    <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_one/steps_1.png" alt="Step 1" />
                                </div>
                                <h3 className="steps_number">01</h3>
                                <div className="steps-content">
                                    <h3>Our Vision</h3>
                                    <p>Providing revolutionary and bespoke talent solutions that extend beyond conventional hiring, keeping our clients and candidates leading edge on industry breakthroughs and advancements in technology.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="steps-single-item">
                                <div className="steps_icon">
                                    <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_one/steps_2.png" alt="Step 2" />
                                </div>
                                <h3 className="steps_number">02</h3>
                                <div className="steps-content">
                                    <h3>Monitoring and Evaluation</h3>
                                    <p>Completely implement globals without
                                        impactful markets in conveniently done
                                        innovate customer directed</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="steps-single-item">
                                <div className="steps_icon">
                                    <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_one/steps_3.png" alt="Step 3" />
                                </div>
                                <h3 className="steps_number">03</h3>
                                <div className="steps-content">
                                    <h3>Mission</h3>
                                    <p>Enhancing recruitment processes through technological means in order to ensure efficiency, honesty, and a satisfying experience for both the client and candidate.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="faq_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section_title text-center">
                                <h4>FAQ’s</h4>
                                <h1>Frequently Asked Questions</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tab_container">
                                <div id="tab1" className="tab_content">
                                    <ul className="accordion">
                                        {faqData.map((item, index) => (
                                            <li key={index}>
                                                <a onClick={() => toggleFAQ(index)}>
                                                    <span>{item.question}</span>
                                                    <i className={`las ${activeIndex === index ? 'la-angle-up' : 'la-angle-down'}`}></i>
                                                </a>
                                                <div className={activeIndex === index ? 'active' : ''}>
                                                    <p>{item.answer}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
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

export default About;
