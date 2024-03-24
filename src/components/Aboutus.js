import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUtensils, faMugHot } from '@fortawesome/free-solid-svg-icons';
import '../Background.css';

function Aboutus() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="background-container" style={{ position: 'relative' }}>
        <img
          style={{
            width: '100%',
            height: '730px',
            objectFit: 'cover',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
          src="bg2.jpg"
          alt="Background Image"
          className="background-image"
        />
  
        <div className="about-us-overlay" style={{ marginBottom:"20%", position: 'absolute', bottom: '20px', left: '50%', transform: 'translatex(-50%)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
            About Us
          </h2>
          <p style={{ fontSize: '18px', color: '#fff', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>
            Welcome to Two Cups Cafe & Resto, where we serve the finest coffee and delicious snacks.
          </p>
          <p style={{ fontSize: '18px', color: '#fff', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>
            At Two Cups, our passion is to provide a warm and inviting atmosphere for coffee enthusiasts and food lovers alike.
          </p>
          <p style={{ fontSize: '18px', color: '#fff', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>
            Explore our diverse menu, featuring a wide range of coffee blends, delectable snacks, and hearty meals crafted with love and care.
          </p>
          <div style={{ marginTop: '20px' }}>
            <FontAwesomeIcon icon={faCoffee} style={{ fontSize: '30px', marginRight: '20px', color: '#fff' }} />
            <FontAwesomeIcon icon={faUtensils} style={{ fontSize: '30px', marginRight: '20px', color: '#fff' }} />
            <FontAwesomeIcon icon={faMugHot} style={{ fontSize: '30px', color: '#fff' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
