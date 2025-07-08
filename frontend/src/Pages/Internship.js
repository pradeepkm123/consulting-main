import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import './Jobdetails.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import FloatingButtons from '../Components/FloatingButtons';

function Internship() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    help: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'file') {
        if (formData.file) {
          data.append(key, formData.file);
        }
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('https://consulting-4rbe.onrender.com/api/callback/submit', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        toast.success('Form submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          qualification: '',
          help: '',
          file: null,
        });
      } else {
        const errorData = await response.json();
        console.error('Server responded with an error:', errorData);
        toast.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="breadcumb-area d-flex">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              <div className="breadcumb-content">
                <div className="breadcumb-title">
                  <h4>Internship</h4>
                </div>
                <ul>
                  <li>
                    <a href="index.html">
                      <i className="las la-home"></i> Home
                    </a>
                  </li>
                  <li className="rotates">
                    <i className="las la-slash"></i>Internship
                  </li>
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
              <div className="col-lg-12">
                <div className="port_details_content style_two">
                  <h2 className="pb-15">Want to Build your career in HR domain?</h2>
                  <p>
                    Welcome to Future Solutions, your gateway to a dynamic and promising career! At Future Solutions, we understand the pivotal role HR internships play in shaping the future of ambitious graduates and students. Our commitment to bridging the gap between fresh candidates and industry has made us a trusted partner for both aspiring professionals and forward-thinking organizations.
                  </p>
                  <p>
                    Future Solutions is more than just an HR internship provider; we are your partner in success. Join us on this exciting journey to unlock doors of opportunity, gain valuable experience, and pave the way for a fulfilling and prosperous career. Elevate your potential with Future Solutions – where your future begins!
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <section className="call_area style_two" style={{ borderRadius: '20px' }}>
                  <div className="container">
                    <div className="row align-items-center" style={{ padding: '0px 30px 0px 20px' }}>
                      <div className="col-lg-8 offset-md-2">
                        <div className="contact-form-box">
                          <div className="call-do-content">
                            <h4>Request a call back</h4>
                            <h2 className="split-collab">Future Solutions - where your future begins!</h2>
                          </div>
                          <form onSubmit={handleSubmit} className="mt-3">
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="form-box">
                                  <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                  />
                                  <i className="las la-user"></i>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="form-box">
                                  <input
                                    type="email"
                                    name="email"
                                    placeholder="E-Mail Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                  />
                                  <i className="lar la-envelope"></i>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="form-box">
                                  <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone No"
                                    value={formData.phone}
                                    onChange={handleChange}
                                  />
                                  <i className="las la-phone"></i>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="form-box">
                                  <input
                                    type="text"
                                    name="qualification"
                                    placeholder="Qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                  />
                                  <i className="las la-graduation-cap"></i>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="form-box">
                                  <input
                                    type="text"
                                    name="help"
                                    placeholder="How can we help you?"
                                    value={formData.help}
                                    onChange={handleChange}
                                  />
                                  <i className="lar la-question-circle"></i>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="form-box">
                                  <input
                                    type="file"
                                    name="file"
                                    style={{ padding: '12px 25px' }}
                                    onChange={handleFileChange}
                                  />
                                  <i className="las la-file-alt"></i>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="contact-form">
                                  <button type="submit" disabled={loading}>
                                    {loading ? <CircularProgress size={24} /> : <><i className="las la-phone-volume"></i> Request Call Back</>}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                          <div id="status"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="call_shape_two bounce-animate2">
                    <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_two/hero_shape2.png" alt="" />
                  </div>
                  <div className="call_shape_three bounce-animate">
                    <img src="https://html.tf.dreamitsolution.net/consalt/assets/images/home_two/hero_dot_shape.png" alt="" />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FloatingButtons/>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Internship;
