import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FloatingButtons from '../Components/FloatingButtons';

function About() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "Integrity:",
            answer: "We maintain the highest ethical standards, promoting truthfulness and integrity at all times. Our relationship starts with trust!"
        },
        {
            question: "Client-Centric Approach:",
            answer: "We understand client’s needs and always look forward to surpass them while matching recruitment aims with the company’s vision."
        },
        {
            question: "Continuous Innovation:",
            answer: "We are open and forward-thinking so we remain relevant in a fast changing sector by delivering high quality talent and workforce needs provision."
        },
        {
            question: "Empathy and Respect:",
            answer: "Our service is based on a policy of dedication to excellence – from the first consultation through selection of a suitable candidate which guarantees top-notch performance."
        },
        {
            question: "Collaboration and Teamwork:",
            answer: "Collaboration is also the essence of our company. Our team-based approach involves not only members but also our partners – our clients and candidates. They can contribute their experience jointly with our experts into an optimum solution."
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

            {/* Breadcrumb Section */}
            <div className="breadcumb-area d-flex mt-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 text-center">
                            <div className="breadcumb-content">
                                <div className="breadcumb-title">
                                    <h4>About Us</h4>
                                </div>
                                <ul>
                                    <li><a href="/"><i className="las la-home"></i> Home </a></li>
                                    <li className="rotates"><i className="las la-slash"></i>About Us</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <section className="about_area style_two">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="about_thumb">
                                <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_two/about_2.png" alt="About Us" />
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
            </section>

            {/* Vision & Mission Section */}
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
                        <div className="col-lg-6 col-md-6">
                            <div className="steps-single-item">
                                <h3 className="steps_number">01</h3>
                                <div className="steps-content">
                                    <h3>Our Vision</h3>
                                    <p>Providing revolutionary and bespoke talent solutions that extend beyond conventional hiring, keeping our clients and candidates leading edge on industry breakthroughs and advancements in technology.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="steps-single-item">
                                <h3 className="steps_number">02</h3>
                                <div className="steps-content">
                                    <h3>Our Mission</h3>
                                    <p>To deliver impactful and client-focused services with integrity, innovation, and a deep understanding of the challenges in a digitally evolving world.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
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
                                <ul className="accordion">
                                    {faqData.map((item, index) => (
                                        <li key={index} style={{ marginBottom: '15px' }}>
                                            <div
                                                onClick={() => toggleFAQ(index)}
                                                style={{
                                                    cursor: 'pointer',
                                                    padding: '12px 15px',
                                                    background: '#f1f1f1',
                                                    borderRadius: '5px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                <span>{item.question}</span>
                                                <i className={`las ${activeIndex === index ? 'la-angle-up' : 'la-angle-down'}`}></i>
                                            </div>
                                            <div className={`faq-answer ${activeIndex === index ? 'open' : ''}`}>
                                                <p>{item.answer}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
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

export default About;
