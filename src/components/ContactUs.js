import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUtensils, faMugHot } from '@fortawesome/free-solid-svg-icons';
import '../Background.css';
import { toast, ToastContainer } from 'react-toastify';

function Contactus() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (!formData.name.trim()) {
      setFormErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
      return;
    }

    
    toast.success('Form submitted')
    
   
  };

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
  
        <div className="contact-us-overlay p-3" style={{backgroundColor:"white", marginBottom: '5%', position: 'absolute', bottom: '20px', left: '50%', transform: 'translatex(-50%)', textAlign: 'center', width: '80%' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    value={formData.name}
    onChange={handleChange}
    style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', backgroundColor: 'transparent'  }}
  />
  <span style={{ color: 'red', marginBottom: '10px' }}>{formErrors.name}</span>

  <input
    type="email"
    name="email"
    placeholder="Your Email"
    value={formData.email}
    onChange={handleChange}
    style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', backgroundColor: 'transparent' }}
  />
  <span style={{ color: 'red', marginBottom: '10px' }}>{formErrors.email}</span>

  <input
    type="tel"
    name="phoneNumber"
    placeholder="Your Phone Number"
    value={formData.phoneNumber}
    onChange={handleChange}
    style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', backgroundColor: 'transparent' }}
  />
  <span style={{ color: 'red', marginBottom: '10px' }}>{formErrors.phoneNumber}</span>

  <textarea
    name="message"
    placeholder="Your Message"
    value={formData.message}
    onChange={handleChange}
    style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', backgroundColor: 'transparent' }}
  />
  <span style={{ color: 'red', marginBottom: '10px' }}>{formErrors.message}</span>

  <button type="submit" style={{ background: '#4CAF50', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
    Submit
  </button>
</form>

          <div style={{ marginTop: '20px', color: '#fff' }}>
            <p>Email: example@email.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Location: Your Cafe Address</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Contactus;
