import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Header.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../logo1.png';

function Navbar() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState(null); // State for active menu item

    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://consulting-main.onrender.com/api/auth/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            toast.error('An error occurred while fetching user data.');
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            toast.success('Login successful!');
            login();
            handleClose();
            navigate('/dashboard');
        } else {
            toast.error('Invalid email or password.');
        }
    };

    const togglePassword = () => {
        const passwordInput = document.getElementById('password');
        const passwordIcon = document.getElementById('passwordIcon');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordIcon.classList.remove('fa-eye');
            passwordIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            passwordIcon.classList.remove('fa-eye-slash');
            passwordIcon.classList.add('fa-eye');
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleMenuItem = (menuItem) => {
        setActiveMenuItem(activeMenuItem === menuItem ? null : menuItem);
    };

    return (
        <div>
            <div className="consalt-header-area style_two style_three inner_page" id="sticky-header">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-2">
                            <div className="header-logo">
                                <a className="active_header" href="/"><img src={logo} alt="logo" width={100} /></a>
                                <a className="active_sticky" href="/"><img src={logo} alt="logo" /></a>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="header-menu" style={{ margin: '0px' }}>
                                <ul className="nav_scroll">
                                    <li><a href="/">Home <span></span></a></li>
                                    <li><a href="/about">About</a></li>
                                    <li>
                                        <a href="#" onClick={() => toggleMenuItem('services')}>Our Services <span><i className="las la-angle-down"></i></span></a>
                                        {activeMenuItem === 'services' && (
                                            <ul className="sub_menu">
                                                <li><a href="/services">Service</a></li>
                                                <li><a href="/internship">Internship</a></li>
                                            </ul>
                                        )}
                                    </li>
                                    <li>
                                        <a href="#" onClick={() => toggleMenuItem('pages')}>Pages <span><i className="las la-angle-down"></i></span></a>
                                        {activeMenuItem === 'pages' && (
                                            <ul className="sub_menu">
                                                <li><a href="/team">Our Team</a></li>
                                                <li><a href="/jobs">Job</a></li>
                                                <li><a href="/resume">Submit Resume</a></li>
                                                <li><a href="#" onClick={handleClickOpen}>Admin Login</a></li>
                                            </ul>
                                        )}
                                    </li>
                                    <li><a href="/industries">Industries <span></span></a></li>
                                    <li><a href="/blogs">Blogs <span></span></a></li>
                                    <li><a href="/contact">Contact</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className={`mobile-menu-area sticky d-sm-block d-md-block d-lg-none ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu mean-container">
                    <div className="mean-bar">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <a className="active_sticky" href="/">
                                <img src={logo} alt="logo" width={100} />
                            </a>

                            <a href="#nav" className="meanmenu-reveal" onClick={toggleMobileMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </a>
                        </div>

                        <nav className="mean-nav">
                            <ul className="nav_scroll" style={{ display: isMobileMenuOpen ? 'block' : 'none' }}>
                                <li>
                                    <a href="#" onClick={() => toggleMenuItem('home')}>
                                        Home
                                    </a>
                                </li>

                                <li><a href="about.html">About</a></li>
                                <li><a href="#" onClick={() => toggleMenuItem('services')}>Our Services <span><i className="las la-angle-down"></i></span></a>
                                    {activeMenuItem === 'services' && (
                                        <ul className="sub_menu">
                                            <li><a href="/services">Service</a></li>
                                            <li><a href="/internship">Internship</a></li>
                                        </ul>
                                    )}
                                </li>
                                <li><a href="#" onClick={() => toggleMenuItem('pages')}>Page <span><i className="las la-angle-down"></i></span></a>
                                    {activeMenuItem === 'pages' && (
                                        <ul className="sub_menu">
                                            <li><a href="/about">About Us</a></li>
                                            <li><a href="/team">Our Team</a></li>
                                            <li><a href="/jobs">Job</a></li>
                                            <li><a href="/resume">Submit Resume</a></li>
                                            <li><a onClick={handleClickOpen}>Admin Login</a></li>
                                        </ul>
                                    )}
                                </li>
                                <li><a href="/industries">Industries</a></li>
                                <li><a href="/blogs">Blogs</a></li>
                                <li className="mean-last"><a href="/contact">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {isSidebarOpen && (
                <div className="xs-sidebar-group info-group">
                    <div className="xs-overlay xs-bg-black" onClick={toggleSidebar}></div>
                    <div className="xs-sidebar-widget">
                        <div className="sidebar-widget-container">
                            <div className="widget-heading">
                                <a href="#" className="close-side-widget" onClick={toggleSidebar}>
                                    <i className="far fa-times-circle"></i>
                                </a>
                            </div>
                            <div className="sidebar-textwidget">
                                <div className="sidebar-info-contents">
                                    <div className="content-inner">
                                        <div className="nav-logo">
                                            <a href="index.html"><img src={logo} alt="sid img" /></a>
                                        </div>
                                        <div className="row padding-two">
                                            <div className="col-lg-6">
                                                <div className="content-thumb-box">
                                                    <img src="assets/images/home_one/team.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="content-thumb-box">
                                                    <img src="assets/images/home_one/team1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="content-thumb-box">
                                                    <img src="assets/images/home_one/team2.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="content-thumb-box">
                                                    <img src="assets/images/home_one/team.jpg" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="contact-info">
                                            <h2>Contact Info</h2>
                                            <ul className="list-style-one">
                                                <li><i className="bi bi-envelope"></i>Chicago 12, Melborne City, USA</li>
                                                <li><i className="bi bi-envelope"></i>(+001) 123-456-7890</li>
                                                <li><i className="bi bi-envelope"></i>Example.com</li>
                                                <li><i className="bi bi-envelope"></i>Week Days: 09.00 to 18.00 Sunday: Closed</li>
                                            </ul>
                                        </div>
                                        <ul className="social-box">
                                            <li className="facebook"><a href="#" className="fab fa-facebook-f"></a></li>
                                            <li className="twitter"><a href="#" className="fab fa-instagram"></a></li>
                                            <li className="linkedin"><a href="#" className="fab fa-twitter"></a></li>
                                            <li className="instagram"><a href="#" className="fab fa-pinterest-p"></a></li>
                                            <li className="youtube"><a href="#" className="fab fa-linkedin-in"></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Dialog open={open} onClose={handleClose}>
                <div className="login-container">
                    <div className="login-card">
                        <h1 className="welcome-title">Admin Login</h1>
                        <p className="welcome-subtitle">We missed you! Please enter your details.</p>

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="password-input-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button type="button" className="password-toggle" onClick={togglePassword}>
                                        <i class="las la-low-vision"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <Button type="submit" className="btn btn-primary btn-sign-in">Login</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
            <ToastContainer />
        </div>
    );
}

export default Navbar;
