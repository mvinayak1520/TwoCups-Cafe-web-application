import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { FaClipboardList, FaBox, FaMoneyBillAlt, FaComments } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
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
  const navigate = useNavigate();
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(false);

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const handleButtonClick = (path,type) => {

    if(type===1){
      setIsLoading1(true);
    }
    if(type===2){
      setIsLoading2(true);
    }
    if(type===3){
      setIsLoading3(true);
    }
    if(type===4){
      setIsLoading4(true);
    }
    
   
    setTimeout(() => {
      if(type===1){
        setIsLoading1(false);
      }
      if(type===2){
        setIsLoading2(false);
      }
      if(type===3){
        setIsLoading3(false);
      }
      if(type===4){
        setIsLoading4(false);
      }
      navigate(path);
    }, 3000);
  };

  return (
    <div style={backgroundImageStyle}>
      <div className="alert alert-secondary" role="alert">
        Admin Dashboard
      </div>
      <div className="container mt-5" style={{marginBottom:"33%"}}>
        <div className="row justify-content-center">
          <animated.div style={fadeIn} className="col-md-3 mb-3">
            <Link  className="btn btn-primary btn-block my-2 my-sm-0 mr-2" onClick={()=>handleButtonClick("/admin-orders",1)}>
              {isLoading1 ? (
                <ThreeDots color="#ffffff" height={20} width={20} />
              ) : (
                <>
                  <FaClipboardList /> Orders
                </>
              )}
            </Link>
          </animated.div>
          <animated.div style={fadeIn} className="col-md-3 mb-3">
            {/* Repeat the same structure for other buttons */}
            <Link  className="btn btn-info btn-block my-2 my-sm-0 mr-2" onClick={()=>handleButtonClick("/admin-products",2)}>
              {isLoading2 ? (
                <ThreeDots color="#ffffff" height={20} width={20} />
              ) : (
                <>
                  <FaBox /> Products
                </>
              )}
            </Link>
          </animated.div>
          <animated.div style={fadeIn} className="col-md-3 mb-3">
            {/* Repeat the same structure for other buttons */}
            <Link className="btn btn-success btn-block my-2 my-sm-0 mr-2" onClick={()=>handleButtonClick("/admin-billings",3)}>
              {isLoading3 ? (
                <ThreeDots color="#ffffff" height={20} width={20} />
              ) : (
                <>
                  <FaMoneyBillAlt /> Billings
                </>
              )}
            </Link>
          </animated.div>
          <animated.div style={fadeIn} className="col-md-3 mb-3">
            {/* Repeat the same structure for other buttons */}
            <Link className="btn btn-warning btn-block my-2 my-sm-0 mr-2" onClick={()=>handleButtonClick("/admin-feedback-view",4)}>
              {isLoading4 ? (
                <ThreeDots color="red" height={20} width={20} />
              ) : (
                <>
                  <FaComments /> Feedbacks
                </>
              )}
            </Link>
          </animated.div>
        </div>
      </div>
      </div>
  );
}

export default AdminHome;
