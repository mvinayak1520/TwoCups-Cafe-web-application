import React, { useState, useEffect } from 'react';
import '../Background.css';

function BackgroundC() {
  const [backgroundImage, setBackgroundImage] = useState('bg.jpg'); 
  const images = ['bg2.jpg', 'bg3.jpg', 'gg5.jpeg', 'gg6.jpg', 'gg7.avif'];

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
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))',
          color: 'white',
          padding: '20px',
          marginTop: '10px',
          height: '400px',
          boxSizing: 'border-box',
        }}
      >
        <h5 style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'avaler-kursive' }}>
          Good Coffee will always find the audience!
        </h5>
        <h5 style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'avaler-kursive' }}>
          We provide a variety of unique and best coffees.
        </h5>
      </div>
    </div>
  );
}

export default BackgroundC;
