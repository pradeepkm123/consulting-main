import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FloatingButtons from '../Components/FloatingButtons';
import axios from 'axios';

function Team() {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('https://consulting-main.onrender.com/api/team');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="breadcumb-area d-flex">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              <div className="breadcumb-content">
                <div className="breadcumb-title">
                  <h4>Our Team</h4>
                </div>
                <ul>
                  <li><a href="/"><i className="las la-home"></i> Home </a></li>
                  <li className="rotates"><i className="las la-slash"></i>Team</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="team_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section_title text-center">
                <h4>MEET OUR TEAM</h4>
                <h1>We’ve 36+ Active & Dedicated Members</h1>
                <h1>for Helping the Customers</h1>
                <p>Globally engage cross-media leadership skills before cross-media innovation forward develop standardized platforms without robust</p>
              </div>
            </div>
          </div>
          <div className="row">
            {teamMembers.map((member) => (
              <div key={member._id} className="col-lg-4 col-md-6">
                <div className="single-team_item style_three">
                  <div className="team_thumb">
                    <img src={`https://consulting-main.onrender.com${member.imageUrl}`} alt={member.name} />
                  </div>
                  <div className="team-content">
                    <h3><a href="#">{member.name}</a></h3>
                    <span>{member.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </div>
  );
}

export default Team;
