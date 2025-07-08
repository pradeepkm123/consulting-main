import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo1.png';

function Footer() {
  return (
    <div>
      <section className="footer_area boxed">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer_logo">
                <Link to="/"><img src={logo} alt="logo" width={150} /></Link>
              </div>
              <p className="footer_desc">
                We are the leading human resources consulting firm dedicated to providing
                comprehensive HR solutions for businesses in India.
              </p>
            </div>

            <div className="col-lg-1"></div>

            <div className="col-lg-2 col-md-6">
              <div className="footer-widget-content">
                <div className="footer-widget-title">
                  <h4>Company</h4>
                </div>
                <div className="footer-widget-menu">
                  <ul>
                    <li><Link to="/team"><i className="las la-angle-double-right"></i> Our Team</Link></li>
                    <li><Link to="/contact"><i className="las la-angle-double-right"></i> Contact Us</Link></li>
                    <li><Link to="/about"><i className="las la-angle-double-right"></i> About</Link></li>
                    <li><Link to="/blog"><i className="las la-angle-double-right"></i> Blog</Link></li>
                    <li><Link to="/privacy-policy"><i className="las la-angle-double-right"></i> Privacy Policy</Link></li>
                    <li><Link to="/terms"><i className="las la-angle-double-right"></i> Terms and Conditions</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="footer-widget-content">
                <div className="footer-widget-title">
                  <h4>Quick Links</h4>
                </div>
                <div className="footer-widget-menu">
                  <ul>
                    <li><Link to="/internship"><i className="las la-angle-double-right"></i> Internship</Link></li>
                    <li><Link to="/jobs"><i className="las la-angle-double-right"></i> Job</Link></li>
                    <li><Link to="/services"><i className="las la-angle-double-right"></i> Our Services</Link></li>
                    <li><Link to="/industries"><i className="las la-angle-double-right"></i> Industries</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget-contact">
                <div className="footer-widget-title">
                  <h4>Contact</h4>
                </div>

                

                <div className="footer-widget-address">
                  <div className="footer_widget_icon">
                    <i className="las la-phone" style={{ fontSize: '15px' }}></i>
                  </div>
                  <div className="footer-widget-address_text">
                    <a href="tel:9884982465" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <p>9884982465</p>
                    </a>
                  </div>
                </div>

                <div className="footer-widget-address">
                  <div className="footer_widget_icon">
                    <i className="las la-envelope-open" style={{ fontSize: '15px' }}></i>
                  </div>
                  <div className="footer-widget-address_text">
                    <a href="mailto:info@hrconsulting.com" style={{ textDecoration: 'none', color: '#fff' }}>
                      info@hrconsulting.com
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="row add-border align-items-center mt-4">
            <div className="col-md-7">
              <div className="footer-bottom-content">
                <div className="footer-bottom-content-copy">
                  <p>Copyright © 2025 Future Solutions</p>
                </div>
              </div>
            </div>

            <div className="col-md-5 text-right">
              <div className="footer-bottom-content">
                <div className="footer-bottom-menu">
                  <ul style={{ listStyle: 'none', display: 'flex', gap: '10px', paddingLeft: 0 }}>
                    <li><a href="https://facebook.com" target="_blank" rel="noreferrer">FACEBOOK</a></li>
                    <li><a href="https://twitter.com" target="_blank" rel="noreferrer">TWITTER</a></li>
                    <li><a href="https://instagram.com" target="_blank" rel="noreferrer">INSTAGRAM</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
