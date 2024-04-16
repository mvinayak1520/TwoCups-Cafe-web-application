import React, { useState, useEffect } from 'react';
import '../Background.css';

function BackgroundC() {
  const [backgroundImage, setBackgroundImage] = useState('bg2.jpg'); 
  const images = ['bg2.jpg','bg1.jpeg', 'bg2.jpeg','bg3.jpeg','bg4.jpeg','bg5.jpeg'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Change the background image every 2 seconds
      const currentIndex = images.indexOf(backgroundImage);
      const nextIndex = (currentIndex + 1) % images.length;
      setBackgroundImage(images[nextIndex]);
    }, 2000);

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [backgroundImage, images]);

  return (
    <div className="background-container">
      <img
        style={{
          width: '100%',
          height: '730px',
          objectFit: 'cover',
        }}
        src={backgroundImage}
        alt="Background Image"
        className="background-image"
      />
      <div
        className="text-overlay"
        style={{paddingTop:"4%",height:"52%", marginBottom:"20%", position: 'absolute', bottom: '20px',width:"30%", left: '50%',top:'10%', transform: 'translatex(-50%)', textAlign: 'center',color:"white" }}
      
      >
        <h5 style={{ fontSize: '35px', fontWeight: 'bold', fontFamily: 'avaler-kursive' }}>
          Good Coffee will always find the audience!
        </h5>
        <h5 style={{ fontSize: '35px', fontWeight: 'bold', fontFamily: 'avaler-kursive' }}>
          We provide a variety of unique and best coffees.
        </h5>
      </div>
    </div>
  );
}

export default BackgroundC;
