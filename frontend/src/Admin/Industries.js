import React, { useState, useEffect } from 'react';
import AddIndustries from './AddIndustries';
import './Dashboard.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Industries() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [industries, setIndustries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [industriesPerPage] = useState(10);
    const [selectedIndustry, setSelectedIndustry] = useState(null);

    const BASE_URL = 'https://consulting-main.onrender.com'; // Change this for production

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const fetchIndustries = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/industries`);
            if (response.ok) {
                const data = await response.json();
                setIndustries(Array.isArray(data) ? data : []);
            } else {
                console.error('Failed to fetch industries');
                setIndustries([]);
            }
        } catch (error) {
            console.error('Error:', error);
            setIndustries([]);
        }
    };

    useEffect(() => {
        fetchIndustries();
    }, []);

    const handleEdit = (industry) => {
        setSelectedIndustry(industry);
        toggleDrawer();
    };

    const handleDelete = async (industryId) => {
        if (window.confirm('Are you sure you want to delete this industry?')) {
            try {
                const response = await fetch(`${BASE_URL}/api/industries/${industryId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success('Industry deleted successfully!');
                    fetchIndustries();
                } else {
                    toast.error('Failed to delete industry');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred while deleting the industry');
            }
        }
    };

    const indexOfLastIndustry = currentPage * industriesPerPage;
    const indexOfFirstIndustry = indexOfLastIndustry - industriesPerPage;
    const currentIndustries = industries.slice(indexOfFirstIndustry, indexOfLastIndustry);
    const totalPages = Math.ceil(industries.length / industriesPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="top-controls">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <div className="d-flex align-items-center gap-3">
                            <button
                                className="btn-add-product"
                                onClick={() => {
                                    setSelectedIndustry(null);
                                    toggleDrawer();
                                }}
                            >
                                <i className="fas fa-plus"></i> Add Industry
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
                                <th>Subtitle</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentIndustries.map((industry) => (
                                <tr key={industry._id}>
                                    <td>{industry.title}</td>
                                    <td>
                                        {industry.imageUrl ? (
                                            <img src={`https://consulting-main.onrender.com/uploads/${industry.imageUrl}`} alt={industry.title} width={100} />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{industry.subtitle}</td>
                                    <td>{new Date(industry.date).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-edit" onClick={() => handleEdit(industry)}>
                                                <i className="fas fa-edit"></i> Edit
                                            </button>
                                            <button className="btn-delete" onClick={() => handleDelete(industry._id)}>
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

            {/* Pagination */}
            <div className="pagination-container">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
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
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" aria-label="Next" onClick={() => paginate(currentPage + 1)}>
                                <i className="las la-angle-right"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Drawer */}
            <AddIndustries
                isOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                onIndustrySubmit={fetchIndustries}
                industry={selectedIndustry}
            />

            <ToastContainer />
        </div>
    );
}

export default Industries;
