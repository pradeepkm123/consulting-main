import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import './Jobdetails.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FloatingButtons from '../Components/FloatingButtons';

function JobDetails() {
  const location = useLocation();
  const { job } = location.state || {};
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    resume: null,
    coverLetter: '',
  });

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      resume: e.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('jobId', job._id);
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('qualification', formData.qualification);
    data.append('resume', formData.resume);
    data.append('coverLetter', formData.coverLetter);

    try {
      const response = await fetch('https://consulting-main.onrender.com/api/jobApplications', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        toast.success('Application submitted successfully');
        handleClose();
      } else {
        toast.error('Failed to submit application');
      }
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  const requiredSkills = job?.requiredSkills || 'Not specified';
  const skillsArray = typeof requiredSkills === 'string' ? requiredSkills.split(',') : Array.isArray(requiredSkills) ? requiredSkills : [];

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
      <div className="header-banner"></div>
      <div className="container main-content">
        <div className="row">
          <div className="col-lg-8 col-md-7">
            <div className="content-card">
              <div className="d-flex align-items-center justify-content-between flex-wrap mb-4">
                <div className="d-flex align-items-center">
                  <div>
                    <h1 className="job-title mb-0">{job?.positionName || 'Job Title'}</h1>
                    <div className="company-info">
                      {job?.companyName || 'Company Name'} <span className="verified-badge"><i className="las la-check-circle"></i></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="section-title">Job Description:</h3>
                <p className="job-description">
                  {job?.jobDescription || 'Job description not available.'}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="section-title">Key Responsibilities:</h3>
                <div className="responsibility-item">
                  {job?.keyResponsibilities || 'Key responsibilities not available.'}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="section-title">Required Skills:</h3>
                <div>
                  {skillsArray.length > 0 ? skillsArray.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill.trim()}</span>
                  )) : 'Required skills not available.'}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-5">
            <div className="sidebar-card">
              <h3 className="sidebar-title text-center">Apply for this Position</h3>
              <div className="info-item">
                <div className="info-label">Job Category</div>
                <div className="info-value">
                  {job?.jobCategory || 'Not specified'}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">Job Type</div>
                <div className="info-value">{job?.jobType || 'Not specified'}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Job Mode</div>
                <div className="info-value">{job?.jobMode || 'Not specified'}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Experience</div>
                <div className="info-value">{job?.experience || 'Not specified'}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Location</div>
                <div className="info-value">{job?.jobLocation || 'Not specified'}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Education Details</div>
                <div className="info-value">{job?.educationDetails || 'Not specified'}</div>
              </div>
              <div>
                <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ width: '100%' }}>
                  Apply Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingButtons/>
      <Footer />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Apply for Job</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField autoFocus margin="dense" id="fullName" label="Full Name" name="fullName" type="text" fullWidth required onChange={handleChange} />
            <TextField margin="dense" id="email" label="Email Address" name="email" type="email" fullWidth required onChange={handleChange} />
            <TextField margin="dense" id="phone" label="Phone Number" name="phone" type="tel" fullWidth required onChange={handleChange} />
            <TextField margin="dense" id="qualification" label="Qualification" name="qualification" type="text" fullWidth required onChange={handleChange} />
            <Button variant="contained" component="label" fullWidth>
              Upload Resume
              <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" hidden required onChange={handleFileChange} />
            </Button>
            <TextField margin="dense" id="coverLetter" label="Cover Letter" name="coverLetter" type="text" fullWidth multiline rows={4} required onChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit Application
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default JobDetails;
