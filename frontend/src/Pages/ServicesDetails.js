import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FloatingButtons from '../Components/FloatingButtons';

function ServicesDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`https://consulting-4rbe.onrender.com/api/services/${id}`);
        if (response.ok) {
          const data = await response.json();
          setService(data);
        } else {
          console.error('Failed to fetch service details');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!service) {
    return <div>No service data found.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="breadcumb-area d-flex mt-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              <div className="breadcumb-content">
                <div className="breadcumb-title">
                  <h4>Service Details</h4>
                </div>
                <ul>
                  <li><a href="/"><i className="las la-home"></i> Home </a></li>
                  <li className="rotates"><i className="las la-slash"></i>Service Details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container mt-5 mb-5'>
        <div className='row'>
          <div className='col-md-6'>
            <img
              src={`https://consulting-4rbe.onrender.com/${service.imageUrl}`}
              alt={service.title}
              style={{ width: '100%', borderRadius: '10px' }}
            />

          </div>
          <div className='col-md-6'>
            <h3 className='mb-2'>{service.title}</h3>
            <p>{service.description}</p>
            <p>{service.paragraph}</p>
          </div>
        </div>
      </div>
      <FloatingButtons />
      <Footer />
    </div>
  );
}

export default ServicesDetails;
