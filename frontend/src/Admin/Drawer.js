// import React, { useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Drawer({ isOpen, toggleDrawer, job, onJobSubmit }) {
//   const [formData, setFormData] = useState({
//     jobCategory: '',
//     jobType: '',
//     jobLocation: '',
//     positionName: '',
//     companyName: '', // Add this field
//     experience: '',
//     educationDetails: '',
//     jobDescription: '',
//     keyResponsibilities: '',
//     requiredSkills: '',
//     salary: '',
//   });

//   const jobCategories = [
//     'Retail',
//     'Real Estate',
//     'Pharmaceuticals',
//     'FMCG',
//     'Electric Vehicles (EV)',
//     'Technology',
//     'Manufacturing',
//     'Hospitality',
//     'Interior Design',
//     'Audit & Finance',
//     'Automobile',
//     'Banking & Finance',
//     'Hotel',
//     'EdTech',
//     'Logistics',
//     'Television',
//     'Malls & Super Market',
//     'Healthcare',
//     'Telecom',
//     'Power & Energy',
//     'Oil & Gas',
//     'Event Management',
//     'Fintech',
//     'E-commerce',
//     'Gold & Diamonds',
//     'Apparels',
//     'Electronics & Digital Products'
//   ];

//   useEffect(() => {
//     if (job) {
//       setFormData(job);
//     } else {
//       setFormData({
//         jobCategory: '',
//         jobType: '',
//         jobLocation: '',
//         positionName: '',
//         companyName: '', // Add this field
//         experience: '',
//         educationDetails: '',
//         jobDescription: '',
//         keyResponsibilities: '',
//         requiredSkills: '',
//         salary: '',
//       });
//     }
//   }, [job]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = job ? `https://consulting-4rbe.onrender.com/api/jobs/${job._id}` : 'https://consulting-4rbe.onrender.com/api/jobs';
//       const method = job ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         toggleDrawer();
//         onJobSubmit();
//         toast.success(job ? 'Job updated successfully!' : 'Job added successfully!');
//       } else {
//         console.error('Failed to save job');
//         toast.error('Failed to save job');
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
//           <h3>{job ? 'Edit Job' : 'Add Job'}</h3>
//           <button className="close-btn" onClick={toggleDrawer}>
//             &times;
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
//           <div className="form-group">
//             <label>Job Category</label>
//             <select name="jobCategory" value={formData.jobCategory} onChange={handleChange}>
//               <option value="">Select a category</option>
//               {jobCategories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Job Type</label>
//             <input type="text" name="jobType" value={formData.jobType} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label>Job Location</label>
//             <input type="text" name="jobLocation" value={formData.jobLocation} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label>Position Name</label>
//             <input type="text" name="positionName" value={formData.positionName} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label>Company Name</label> {/* Add this field */}
//             <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label>Experience</label>
//             <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label>Education Details</label>
//             <input type="text" name="educationDetails" value={formData.educationDetails} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label>Job Description</label>
//             <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange}></textarea>
//           </div>
//           <div className="form-group">
//             <label>Key Responsibilities</label>
//             <textarea name="keyResponsibilities" value={formData.keyResponsibilities} onChange={handleChange}></textarea>
//           </div>
//           <div className="form-group">
//             <label>Required Skills</label>
//             <input type="text" name="requiredSkills" value={formData.requiredSkills} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label>Salary</label>
//             <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
//           </div>
//           <button type="submit" className="submit-btn">{job ? 'Update' : 'Submit'}</button>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Drawer;




import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Drawer({ isOpen, toggleDrawer, job, onJobSubmit }) {
  const [formData, setFormData] = useState({
    jobCategory: '',
    jobType: '',
    jobLocation: '',
    positionName: '',
    companyName: '',
    experience: '',
    educationDetails: '',
    jobDescription: '',
    keyResponsibilities: '',
    requiredSkills: '',
    salary: '',
  });

  const jobCategories = [
    'Retail', 'Real Estate', 'Pharmaceuticals', 'FMCG', 'Electric Vehicles (EV)',
    'Technology', 'Manufacturing', 'Hospitality', 'Interior Design', 'Audit & Finance',
    'Automobile', 'Banking & Finance', 'Hotel', 'EdTech', 'Logistics',
    'Television', 'Malls & Super Market', 'Healthcare', 'Telecom', 'Power & Energy',
    'Oil & Gas', 'Event Management', 'Fintech', 'E-commerce', 'Gold & Diamonds',
    'Apparels', 'Electronics & Digital Products'
  ];

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        jobCategory: '',
        jobType: '',
        jobLocation: '',
        positionName: '',
        companyName: '',
        experience: '',
        educationDetails: '',
        jobDescription: '',
        keyResponsibilities: '',
        requiredSkills: '',
        salary: '',
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = job ? `https://consulting-4rbe.onrender.com/api/jobs/${job._id}` : 'https://consulting-4rbe.onrender.com/api/jobs';
      const method = job ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toggleDrawer();
        onJobSubmit();
        toast.success(job ? 'Job updated successfully!' : 'Job added successfully!');
      } else {
        console.error('Failed to save job');
        toast.error('Failed to save job');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    }
  };

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <div className="drawer-header">
          <h3>{job ? 'Edit Job' : 'Add Job'}</h3>
          <button className="close-btn" onClick={toggleDrawer}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <div className="form-group">
            <label>Job Category</label>
            <select name="jobCategory" value={formData.jobCategory} onChange={handleChange}>
              <option value="">Select a category</option>
              {jobCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Job Type</label>
            <input type="text" name="jobType" value={formData.jobType} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Job Location</label>
            <input type="text" name="jobLocation" value={formData.jobLocation} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Position Name</label>
            <input type="text" name="positionName" value={formData.positionName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Experience</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Education Details</label>
            <input type="text" name="educationDetails" value={formData.educationDetails} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Job Description</label>
            <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Key Responsibilities</label>
            <textarea name="keyResponsibilities" value={formData.keyResponsibilities} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Required Skills</label>
            <input type="text" name="requiredSkills" value={formData.requiredSkills} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
          </div>
          <button type="submit" className="submit-btn">{job ? 'Update' : 'Submit'}</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Drawer;

