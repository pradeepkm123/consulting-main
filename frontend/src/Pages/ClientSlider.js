import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';

const ClientSlider = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://consulting-main.onrender.com/api/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="client-slider-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section_title text-center">
              <h4>OUR CLIENTS</h4>
              <h1>Our Valued Clients</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Slider {...settings}>
              {clients.map((client) => (
                client.images.map((image, index) => (
                  <div className="client-slide" key={`${client._id}-${index}`}>
                    <div className="client-image">
                      <img src={`https://consulting-main.onrender.com/${image}`} alt={`Client ${client.name}`} style={{width:'200px'}} />
                    </div>
                  </div>
                ))
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSlider;
