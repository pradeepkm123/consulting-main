import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SubmittedResumes() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('https://consulting-4rbe.onrender.com/api/resumes');
        setResumes(response.data);
      } catch (error) {
        toast.error('Error fetching resumes');
      }
    };

    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await axios.delete(`https://consulting-4rbe.onrender.com/api/resumes/${id}`);
        setResumes(resumes.filter(resume => resume._id !== id));
        toast.success('Resume deleted successfully!');
      } catch (error) {
        toast.error('Error deleting resume');
      }
    }
  };

  return (
    <div>
      <h3>Submitted Resumes</h3>
      <table className="table table-bordered mt-3">
        <thead className="thead-dark">
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
          {resumes.length > 0 ? (
            resumes.map((resume) => (
              <tr key={resume._id}>
                <td>{resume.fullName}</td>
                <td>{resume.email}</td>
                <td>{resume.phone}</td>
                <td>{resume.qualification}</td>
                <td>
                  <a href={`https://consulting-4rbe.onrender.com/${resume.resumePath}`} target="_blank" rel="noopener noreferrer">View Resume</a>
                </td>
                <td>
                  {resume.coverLetterPath ? (
                    <a href={`https://consulting-4rbe.onrender.com/${resume.coverLetterPath}`} target="_blank" rel="noopener noreferrer">View Cover Letter</a>
                  ) : (
                    'No Cover Letter'
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(resume._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <i className="fas fa-trash-alt" style={{ color: 'red' }}></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default SubmittedResumes;
