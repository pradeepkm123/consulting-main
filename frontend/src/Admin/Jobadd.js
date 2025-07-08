import React, { useState, useEffect } from 'react';
import Drawer from './Drawer';
import './Dashboard.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function JobAdd() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);
  const [showApplications, setShowApplications] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('https://consulting-4rbe.onrender.com/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch jobs');
        setJobs([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setJobs([]);
    }
  };

  const fetchJobApplications = async (jobId) => {
    try {
      const response = await fetch(`https://consulting-4rbe.onrender.com/api/jobApplications/${jobId}`);
      if (response.ok) {
        const data = await response.json();
        setJobApplications(Array.isArray(data) ? data : []);
        setShowApplications(true);
      } else {
        console.error('Failed to fetch job applications');
        setJobApplications([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setJobApplications([]);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setSelectedJob(job);
    toggleDrawer();
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch(`https://consulting-4rbe.onrender.com/api/jobs/${jobId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Job deleted successfully!');
          fetchJobs();
        } else {
          toast.error('Failed to delete job');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while deleting the job');
      }
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        const response = await fetch(`https://consulting-4rbe.onrender.com/api/jobApplications/${applicationId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Application deleted successfully!');
          fetchJobApplications(selectedJob._id);
        } else {
          toast.error('Failed to delete application');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while deleting the application');
      }
    }
  };

  const filteredJobs = Array.isArray(jobs) ? jobs.filter(job =>
    job.positionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.jobType.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard-container">
      <div className="top-controls">
        <div className="row align-items-center">
          <div className="col">
            <label className="form-label" style={{ fontSize: '14px', fontWeight: 600, color: '#495057' }}>Search</label>
            <div className="search-box">
              <i className="las la-search"></i>
              <input
                type="text"
                placeholder="Search by position or job type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-auto">
            <div className="d-flex align-items-center gap-3">
              <button className="btn-add-product" onClick={() => {
                setSelectedJob(null);
                toggleDrawer();
              }}>
                <i className="fas fa-plus"></i>
                Add Job
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="products-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Job Category</th>
                <th>Position Name</th>
                <th>Job Location</th>
                <th>Job Type</th>
                <th>Experience</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentJobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.jobCategory}</td>
                  <td>{job.positionName}</td>
                  <td>{job.jobLocation}</td>
                  <td>{job.jobType}</td>
                  <td>{job.experience}</td>
                  <td>{job.salary}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-edit" onClick={() => handleEdit(job)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(job._id)}>
                        <i className="las la-trash"></i>
                      </button>
                      <button className="btn-view" onClick={() => {
                        setSelectedJob(job);
                        fetchJobApplications(job._id);
                      }}>
                        <i className="las la-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination-container">
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous" onClick={() => paginate(currentPage - 1)}>
                <i className="las la-angle-left"></i>
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <a className="page-link" href="#" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next" onClick={() => paginate(currentPage + 1)}>
                <i className="las la-angle-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {showApplications && (
        <div className="applications-table">
          <h3>Applications for {selectedJob.positionName}</h3>
          {jobApplications.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Qualification</th>
                  <th>Resume</th>
                  <th>Cover Letter</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobApplications.map((application) => (
                  <tr key={application._id}>
                    <td>{application.fullName}</td>
                    <td>{application.email}</td>
                    <td>{application.phone}</td>
                    <td>{application.qualification}</td>
                    <td>
                      <a target='_blank' href={`https://consulting-4rbe.onrender.com/${application.resume}`} download>
                        <i className="las la-download"></i>
                      </a>
                    </td>
                    <td>{application.coverLetter}</td>
                    <td>
                      <button className="btn-delete" onClick={() => handleDeleteApplication(application._id)}>
                        <i className="las la-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{textAlign:'center'}}>No applications found.</p>
          )}
        </div>
      )}
      <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} onJobSubmit={fetchJobs} job={selectedJob} />
      <ToastContainer />
    </div>
  );
}

export default JobAdd;
