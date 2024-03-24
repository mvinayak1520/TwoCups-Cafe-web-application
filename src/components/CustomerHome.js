import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaPercent, FaComments } from 'react-icons/fa';

function CustomerHome() {

  const backgroundImageStyle = {
    backgroundImage: `url('bg2.jpg')`,  
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%', 
          height:"730px",
          objectFit: 'cover', 
    opacity: 0.8,
  };


  return (
    <div style={backgroundImageStyle}>
      <div className="alert alert-secondary" role="alert">
        Customer Home
      </div>
      <div className="container mt-2"  >
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card card-custom" style={{ backgroundColor: "#f8d7da" }}>
              <div className="card-body" >
                <Link to="/customer-menu" className="card-title">
                  <h5 className="card-title">Menu</h5>
                </Link>
                <FaUtensils className="fa-3x" />
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card card-custom" style={{ backgroundColor: "#d4edda" }}>
              <div className="card-body">
                <Link to="/customer-offers" className="card-title">
                  <h5 className="card-title">Offers</h5>
                </Link>
                <FaPercent className="fa-3x" />
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card card-custom" style={{ backgroundColor: "#cce5ff" }}>
              <div className="card-body">
                <Link to="/customer-order-history" className="card-title">
                  <h5 className="card-title">Order History</h5>
                </Link>
                <i className="fas fa-history fa-3x"></i>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card card-custom" style={{ backgroundColor: "#fff3cd" }}>
              <div className="card-body">
                <Link to="/customer-feedback" className="card-title">
                  <h5 className="card-title">Give Feedbacks</h5>
                </Link>
                <FaComments className="fa-3x" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerHome;
