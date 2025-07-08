import React, { useEffect, useState } from 'react';

function AdminContact() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('https://consulting-4rbe.onrender.com/api/contact');

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        setContacts(result);
      } catch (err) {
        console.error("Error fetching contacts: ", err);
        setError(err.message);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://consulting-4rbe.onrender.com/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts(contacts.filter(contact => contact._id !== id));
      } else {
        throw new Error('Failed to delete contact');
      }
    } catch (err) {
      console.error("Error deleting contact: ", err);
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Contact Submissions</h3>
      <table className='mt-3' style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Phone</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Subject</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Message</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Created At</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} style={{ backgroundColor: '#f9f9f9' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{contact.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{contact.phone}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{contact.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{contact.subject}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{contact.message}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(contact.createdAt).toLocaleString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => handleDelete(contact._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <i class="las la-trash"></i> {/* Make sure you have Font Awesome or similar for the trash icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminContact;
