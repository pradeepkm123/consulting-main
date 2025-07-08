import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

function InternshipList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const BASE_URL = 'https://consulting-main.onrender.com'; // Adjust if deployed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/callback`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/callback/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the request');
      }
      setData(data.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error('Error deleting data:', err);
    }
  };

  const openModal = (entry) => {
    setSelectedEntry(entry);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEntry(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.phone}</td>
              <td>{entry.qualification}</td>
              <td>{entry.help}</td>
              <td>
                {entry.file ? (
                  <a href={`${BASE_URL}/${entry.file.replace('public/', '')}`} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                ) : (
                  'No File'
                )}
              </td>
              <td>{new Date(entry.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => openModal(entry)} className="btn btn-info btn-sm mr-2">
                  View
                </button>
                <button onClick={() => handleDelete(entry._id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Internship Details"
      >
        {selectedEntry && (
          <div>
            <h2>Internship Details</h2>
            <p><strong>Name:</strong> {selectedEntry.name}</p>
            <p><strong>Email:</strong> {selectedEntry.email}</p>
            <p><strong>Phone:</strong> {selectedEntry.phone}</p>
            <p><strong>Qualification:</strong> {selectedEntry.qualification}</p>
            <p><strong>Help Needed:</strong> {selectedEntry.help}</p>
            <p><strong>Date:</strong> {new Date(selectedEntry.createdAt).toLocaleString()}</p>
            <button onClick={closeModal} className="btn btn-secondary">Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default InternshipList;
