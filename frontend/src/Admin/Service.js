import React, { useState, useEffect } from 'react';
import AddService from './AddService';
import './Dashboard.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Service() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(10);
  const [selectedService, setSelectedService] = useState(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('https://consulting-main.onrender.com/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch services');
        setServices([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setServices([]);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service) => {
    setSelectedService(service);
    toggleDrawer();
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`https://consulting-main.onrender.com/api/services/${serviceId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Service deleted successfully!');
          fetchServices();
        } else {
          toast.error('Failed to delete service');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while deleting the service');
      }
    }
  };

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(services.length / servicesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard-container">
      <div className="top-controls">
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="d-flex align-items-center gap-3">
              <button className="btn-add-product" onClick={() => {
                setSelectedService(null);
                toggleDrawer();
              }}>
                <i className="fas fa-plus"></i>
                Add Service
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
                <th>Title</th>
                <th>Image</th>
                <th>Icon</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentServices.map((service) => (
                <tr key={service._id}>
                  <td>{service.title}</td>
                  <td>
                    {service.imageUrl && (
                      <img
                        src={`https://consulting-main.onrender.com/${service.imageUrl}`}
                        alt={service.title}
                        style={{ width: '100px', height: 'auto' }}
                      />
                    )}
                  </td>
                  <td>
                    {service.iconUrl && (
                      <img
                        src={`https://consulting-main.onrender.com/${service.iconUrl}`}
                        alt={service.title}
                        style={{ width: '50px', height: 'auto' }}
                      />
                    )}
                  </td>
                  <td>{new Date(service.date).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-edit" onClick={() => handleEdit(service)}>
                        <i className="fas fa-edit"></i>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(service._id)}>
                        <i className="las la-trash"></i>
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
      {isDrawerOpen && (
        <AddService
          isOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          onServiceSubmit={fetchServices}
          service={selectedService}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default Service;
