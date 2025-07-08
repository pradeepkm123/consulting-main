import React, { useState, useEffect } from 'react';

function AddService({ isOpen, toggleDrawer, onServiceSubmit, service }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [paragraph, setParagraph] = useState(''); // New state for paragraph

  useEffect(() => {
    if (service) {
      setTitle(service.title);
      setDate(service.date);
      setDescription(service.description);
      setParagraph(service.paragraph || ''); // Set paragraph if it exists
    } else {
      setTitle('');
      setImage(null);
      setIcon(null);
      setDate('');
      setDescription('');
      setParagraph(''); // Reset paragraph state
    }
  }, [service]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('description', description);
    formData.append('paragraph', paragraph); // Append paragraph to form data
    if (image) {
      formData.append('image', image);
    }
    if (icon) {
      formData.append('icon', icon);
    }

    try {
      const url = service ? `https://consulting-main.onrender.com/api/services/${service._id}` : 'https://consulting-main.onrender.com/api/services';
      const method = service ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        onServiceSubmit();
        toggleDrawer();
      } else {
        console.error('Failed to save service');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <h2>{service ? 'Edit Service' : 'Add Service'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="form-group">
            <label>Icon</label>
            <input type="file" className="form-control" onChange={(e) => setIcon(e.target.files[0])} />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Paragraph</label>
            <textarea className="form-control" value={paragraph} onChange={(e) => setParagraph(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddService;
