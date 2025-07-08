import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import './Resume.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FloatingButtons from '../Components/FloatingButtons';

function Resume() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting submission

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    data.append('resume', e.target.resume.files[0]);
    if (e.target.coverLetter.files[0]) {
      data.append('coverLetter', e.target.coverLetter.files[0]);
    }

    try {
      const response = await axios.post('https://consulting-main.onrender.com/api/resumes', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Error submitting resume');
    } finally {
      setLoading(false); // Set loading to false after submission completes
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
                  <h4>Resume Submit</h4>
                </div>
                <ul>
                  <li><a href="/"><i className="las la-home"></i> Home </a></li>
                  <li className="rotates"><i className="las la-slash"></i>Resume Submit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="main-container">
          <div className="content-wrapper">
            <div className="left-section">
              <div className="content-section">
                <h2>Your Dream Job Awaits</h2>
                <h3>Let's Make It Happen Together</h3>
                <p>
                  Check our website, where you'll find a dedicated section for submitting your resume. Upload your CV to give us a comprehensive overview of your qualifications, experiences, and the value you bring to the table. After submitting your CV, keep an eye on your email and phone. Our dedicated recruiter reviews applications regularly, and when a suitable opening arises, they will reach out to discuss potential opportunities with you.
                </p>
              </div>
            </div>
            <div className="form-card">
              <div className="form-header">
                <h3>Submit your Resume here</h3>
              </div>
              <div className="form-body">
                <form id="resumeForm" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="fullName" onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-control" name="phone" onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Qualification</label>
                    <input type="text" className="form-control" name="qualification" onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Upload Resume</label>
                    <div className="file-input-wrapper">
                      <input type="file" id="resume" className="file-input" name="resume" accept=".pdf,.doc,.docx" required />
                      <label htmlFor="resume" className="file-input-label">
                        📄 Choose file or drag here
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cover Letter</label>
                    <div className="file-input-wrapper">
                      <input type="file" id="coverLetter" className="file-input" name="coverLetter" accept=".pdf,.doc,.docx" />
                      <label htmlFor="coverLetter" className="file-input-label">
                        📄 Choose file or drag here
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : <><i className="lab la-telegram"></i> Submit Resume</>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingButtons/>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Resume;
