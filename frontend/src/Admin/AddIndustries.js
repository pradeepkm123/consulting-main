import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './Dashboard.css';

function Heading({ children }) {
  return <h2 className="heading">{children}</h2>;
}

function AddIndustries({ isOpen, toggleDrawer, onIndustrySubmit, industry }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    iconUrl: '',
    date: '',
    contentSets: [{ heading: '', paragraph: '' }],
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (industry) {
      setFormData({
        title: industry.title || '',
        subtitle: industry.subtitle || '',
        description: industry.description || '',
        iconUrl: industry.iconUrl || '',
        date: industry.date ? industry.date.split('T')[0] : '',
        contentSets: industry.contentSets || [{ heading: '', paragraph: '' }],
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        iconUrl: '',
        date: '',
        contentSets: [{ heading: '', paragraph: '' }],
      });
    }
  }, [industry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleContentSetChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContentSets = [...formData.contentSets];
    updatedContentSets[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      contentSets: updatedContentSets,
    }));
  };

  const addContentSet = () => {
    setFormData((prev) => ({
      ...prev,
      contentSets: [...prev.contentSets, { heading: '', paragraph: '' }],
    }));
  };

  const removeContentSet = (index) => {
    const updated = [...formData.contentSets];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, contentSets: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = industry
      ? `https://consulting-4rbe.onrender.com/api/industries/${industry._id}`
      : 'https://consulting-4rbe.onrender.com/api/industries';
    const method = industry ? 'PUT' : 'POST';
    const form = new FormData();
    form.append('title', formData.title);
    form.append('subtitle', formData.subtitle);
    form.append('description', formData.description);
    form.append('iconUrl', formData.iconUrl);
    form.append('date', formData.date);
    form.append('contentSets', JSON.stringify(formData.contentSets));
    if (imageFile) {
      form.append('image', imageFile);
    }
    try {
      const response = await fetch(endpoint, {
        method,
        body: form,
      });
      if (response.ok) {
        toast.success(`Industry ${industry ? 'updated' : 'added'} successfully`);
        onIndustrySubmit();
        toggleDrawer();
      } else {
        toast.error(`Failed to ${industry ? 'update' : 'add'} industry`);
      }
    } catch (error) {
      console.error('Error submitting industry:', error);
      toast.error('An error occurred while submitting');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <div className="drawer-header">
          <Heading>{industry ? 'Edit Industry' : 'Add Industry'}</Heading>
          <button type="button" className="close-icon" onClick={toggleDrawer}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Subtitle</label>
            <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" name="image" onChange={handleFileChange} className="form-control" accept="image/*" />
          </div>
          <div className="form-group">
            <label>Icon URL</label>
            <input type="text" name="iconUrl" value={formData.iconUrl} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
          </div>
          <h5 className="mt-4">Content Sets</h5>
          {formData.contentSets.map((set, index) => (
            <div key={index} className="content-set">
              <input
                type="text"
                name="heading"
                placeholder="Heading"
                value={set.heading}
                onChange={(e) => handleContentSetChange(index, e)}
                className="form-control mb-2"
              />
              <textarea
                name="paragraph"
                placeholder="Paragraph"
                value={set.paragraph}
                onChange={(e) => handleContentSetChange(index, e)}
                className="form-control mb-2"
              />
              <button type="button" onClick={() => removeContentSet(index)} className="btn btn-danger btn-sm mb-3">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addContentSet} className="btn btn-secondary mt-2">
            Add More Content
          </button>
          <div className="form-actions mt-4">
            <button type="button" className="btn btn-danger mr-2" onClick={toggleDrawer}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {industry ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddIndustries;
