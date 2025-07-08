// // AddBlog.js
// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

// function AddBlog({ isOpen, toggleDrawer, onBlogSubmit, blog }) {
//   const [formData, setFormData] = useState({
//     title: '',
//     conclusion: '',
//     date: '',
//     description: '',
//     imageFile: null,
//   });

//   const [sections, setSections] = useState([{ heading: '', paragraph: '' }]);

//   useEffect(() => {
//     if (blog) {
//       setFormData({
//         title: blog.title || '',
//         conclusion: blog.conclusion || '',
//         date: blog.date ? new Date(blog.date).toISOString().split('T')[0] : '',
//         description: blog.description || '',
//         imageFile: null,
//       });
//       setSections(blog.sections && blog.sections.length ? blog.sections : [{ heading: '', paragraph: '' }]);
//     } else {
//       setFormData({
//         title: '',
//         conclusion: '',
//         date: new Date().toISOString().split('T')[0],
//         description: '',
//         imageFile: null,
//       });
//       setSections([{ heading: '', paragraph: '' }]);
//     }
//   }, [blog]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'imageFile') {
//       setFormData({ ...formData, imageFile: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSectionChange = (index, field, value) => {
//     const updatedSections = [...sections];
//     updatedSections[index][field] = value;
//     setSections(updatedSections);
//   };

//   const addSection = () => setSections([...sections, { heading: '', paragraph: '' }]);

//   const removeSection = (index) => {
//     if (sections.length === 1) return;
//     setSections(sections.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (sections.some(s => !s.heading.trim() || !s.paragraph.trim())) {
//       toast.error('Please fill all heading and paragraph fields');
//       return;
//     }

//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('conclusion', formData.conclusion);
//     data.append('date', formData.date);
//     data.append('description', formData.description);
//     if (formData.imageFile) {
//       data.append('image', formData.imageFile);
//     }
//     data.append('sections', JSON.stringify(sections));

//     try {
//       const url = blog
//         ? `https://consulting-4rbe.onrender.com/api/blogs/${blog._id}`
//         : 'https://consulting-4rbe.onrender.com/api/blogs';
//       const method = blog ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         body: data,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         toggleDrawer();
//         onBlogSubmit();
//         toast.success(blog ? 'Blog updated successfully!' : 'Blog added successfully!');
//       } else {
//         toast.error(result.message || 'Failed to save blog');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('An error occurred');
//     }
//   };

//   return (
//     <div className={`drawer ${isOpen ? 'open' : ''}`}>
//       <div className="drawer-content">
//         <div className="drawer-header">
//           <h3>{blog ? 'Edit Blog' : 'Add Blog'}</h3>
//           <button className="close-btn" onClick={toggleDrawer}>&times;</button>
//         </div>
//         <form onSubmit={handleSubmit} style={{ padding: '20px' }} encType="multipart/form-data">
//           <div className="form-group">
//             <label>Title</label>
//             <input type="text" name="title" value={formData.title} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Conclusion</label>
//             <input
//               type="text"
//               name="conclusion"
//               value={formData.conclusion}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Date</label>
//             <input type="date" name="date" value={formData.date} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Description</label>
//             <textarea name="description" value={formData.description} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Image</label>
//             <input
//               type="file"
//               name="imageFile"
//               onChange={handleChange}
//               accept="image/*"
//               required={!blog}
//             />
//           </div>

//           <hr />
//           <h4>Sections (Multiple Headings and Paragraphs)</h4>
//           {sections.map((section, index) => (
//             <div key={index} style={{ marginBottom: '15px' }}>
//               <input
//                 type="text"
//                 placeholder="Heading"
//                 value={section.heading}
//                 onChange={(e) => handleSectionChange(index, 'heading', e.target.value)}
//                 required
//                 style={{ width: '100%', marginBottom: '5px' }}
//               />
//               <textarea
//                 placeholder="Paragraph"
//                 value={section.paragraph}
//                 onChange={(e) => handleSectionChange(index, 'paragraph', e.target.value)}
//                 required
//                 style={{ width: '100%', marginBottom: '5px' }}
//                 rows={3}
//               />
//               {sections.length > 1 && (
//                 <button type="button" onClick={() => removeSection(index)}>Remove Section</button>
//               )}
//               <hr />
//             </div>
//           ))}
//           <button type="button" onClick={addSection}>Add Section</button>

//           <br />
//           <button type="submit" className="submit-btn" style={{ marginTop: '15px' }}>
//             {blog ? 'Update' : 'Submit'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddBlog;











import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './Dashboard.css';

function Heading({ children }) {
  return <h2 className="heading">{children}</h2>;
}

function AddBlog({ isOpen, toggleDrawer, onBlogSubmit, blog }) {
  const [formData, setFormData] = useState({
    title: '',
    conclusion: '',
    date: '',
    description: '',
    imageFile: null,
  });

  const [contentSets, setContentSets] = useState([{ heading: '', paragraph: '' }]);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        conclusion: blog.conclusion || '',
        date: blog.date ? new Date(blog.date).toISOString().split('T')[0] : '',
        description: blog.description || '',
        imageFile: null,
      });
      setContentSets(blog.contentSets && blog.contentSets.length ? blog.contentSets : [{ heading: '', paragraph: '' }]);
    } else {
      setFormData({
        title: '',
        conclusion: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        imageFile: null,
      });
      setContentSets([{ heading: '', paragraph: '' }]);
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleContentSetChange = (index, field, value) => {
    const updatedContentSets = [...contentSets];
    updatedContentSets[index][field] = value;
    setContentSets(updatedContentSets);
  };

  const addContentSet = () => {
    setContentSets([...contentSets, { heading: '', paragraph: '' }]);
  };

  const removeContentSet = (index) => {
    if (contentSets.length === 1) return;
    setContentSets(contentSets.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contentSets.some(cs => !cs.heading.trim() || !cs.paragraph.trim())) {
      toast.error('Please fill all content set heading and paragraph fields');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('conclusion', formData.conclusion);
    data.append('date', formData.date);
    data.append('description', formData.description);
    if (formData.imageFile) {
      data.append('image', formData.imageFile);
    }
    data.append('contentSets', JSON.stringify(contentSets));

    try {
      const url = blog
        ? `https://consulting-4rbe.onrender.com/api/blogs/${blog._id}`
        : 'https://consulting-4rbe.onrender.com/api/blogs';
      const method = blog ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        toggleDrawer();
        onBlogSubmit();
        toast.success(blog ? 'Blog updated successfully!' : 'Blog added successfully!');
      } else {
        toast.error(result.message || 'Failed to save blog');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <div className="drawer-header">
          <Heading>{blog ? 'Edit Blog' : 'Add Blog'}</Heading>
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
            <label>Conclusion</label>
            <input type="text" name="conclusion" value={formData.conclusion} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" name="imageFile" onChange={handleChange} className="form-control" accept="image/*" required={!blog} />
          </div>
          <h5 className="mt-4">Content Sets</h5>
          {contentSets.map((contentSet, index) => (
            <div key={index} className="content-set">
              <input
                type="text"
                placeholder="Heading"
                value={contentSet.heading}
                onChange={(e) => handleContentSetChange(index, 'heading', e.target.value)}
                className="form-control mb-2"
                required
              />
              <textarea
                placeholder="Paragraph"
                value={contentSet.paragraph}
                onChange={(e) => handleContentSetChange(index, 'paragraph', e.target.value)}
                className="form-control mb-2"
                required
                rows={3}
              />
              {contentSets.length > 1 && (
                <button type="button" onClick={() => removeContentSet(index)} className="btn btn-danger btn-sm mb-3">
                  Remove Content Set
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addContentSet} className="btn btn-secondary mt-2">
            Add Content Set
          </button>
          <div className="form-actions mt-4">
            <button type="button" className="btn btn-danger mr-2" onClick={toggleDrawer}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {blog ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;

