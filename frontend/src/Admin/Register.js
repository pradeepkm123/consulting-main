import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

function Register() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
    status: 'Pending',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('https://consulting-main.onrender.com/api/auth/users');
    const data = await response.json();
    setUsers(data);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and contain at least one special character';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('https://consulting-main.onrender.com/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          toast.success('Registration successful!');
          fetchUsers();
          setFormData({
            name: '',
            email: '',
            password: '',
            role: 'User',
            status: 'Pending',
          });
        } else {
          toast.error('Registration failed!');
        }
      } catch (error) {
        toast.error('An error occurred during registration.');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`https://consulting-main.onrender.com/api/auth/users/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          toast.success('User deleted successfully!');
          fetchUsers();
        } else {
          toast.error('Failed to delete user.');
        }
      } catch (error) {
        toast.error('An error occurred while deleting the user.');
      }
    }
  };

  return (
    <div className="main-container">
      <div className="left-section">
        <div className="login-container">
          <h1 className="login-title">Register a new Account</h1>
          <p className="login-subtitle">Welcome! Please fill in the details to register:</p>
          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                name="name"
                placeholder="Name"
                required
                onChange={handleChange}
                value={formData.name}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="form-group">
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="form-group">
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
                value={formData.password}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="form-group">
              <select className="form-control" name="role" onChange={handleChange} value={formData.role}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <button type="submit" className="login-btn">
              <i className="las la-key"></i> Register
            </button>
          </form>
        </div>
      </div>
      <div className="right-section">
        <div className="table-container">
          <div className="table-header">
            <h2 className="table-title">User Management Dashboard</h2>
            <p className="table-subtitle">Manage and monitor user accounts efficiently</p>
          </div>
          <div>
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td><span className={`status-badge status-${user.status.toLowerCase()}`}>{user.status}</span></td>
                    <td>
                      <button className="btn btn-sm" onClick={() => handleDelete(user._id)}>
                        <i className="las la-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='row'>
            <div className='col-md-12'>
                <div className="pagination-wrapper">
            <div className="pagination-info">
              Showing <span id="currentRange">1-{users.length}</span> of <span id="totalRecords">{users.length}</span> entries
            </div>
            <nav aria-label="Table pagination">
              <ul className="pagination pagination-sm justify-content-end">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabindex="-1">Previous</a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
