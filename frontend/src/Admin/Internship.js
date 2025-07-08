import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InternshipList() {
  const [data, setData] = useState([]);
  const BASE_URL = 'https://consulting-4rbe.onrender.com'; // Adjust if deployed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/callback`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Error fetching data');
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const response = await fetch(`${BASE_URL}/api/callback/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setData(data.filter((entry) => entry._id !== id));
          toast.success('Entry deleted successfully!');
        } else {
          toast.error('Failed to delete entry');
        }
      } catch (err) {
        console.error('Error deleting entry:', err);
        toast.error('Error deleting entry');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Internship Requests</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Qualification</th>
            <th>Help</th>
            <th>File</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.name}</td>
                <td>{entry.email}</td>
                <td>{entry.phone}</td>
                <td>{entry.qualification}</td>
                <td>{entry.help}</td>
                <td>
                  {entry.file ? (
                    <a
                      href={`${BASE_URL}/uploads/${entry.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View File
                    </a>
                  ) : (
                    'No File'
                  )}
                </td>
                <td>{new Date(entry.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(entry._id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <i className="fas fa-trash-alt" style={{ color: 'red' }}></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>
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

export default InternshipList;
