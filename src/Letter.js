import React, { useState } from 'react';
import './Letter.css';
import backgroundVideo from './nebula.mp4'; // Import the background video

function Letter() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      {/* Add video element for background */}
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`envelope-wrapper ${isOpen ? 'flap' : ''}`} onClick={toggleCard}>
        <div className="envelope">
          <div className="letter">
            <div className="text">
            <strong>Dear friends💓,</strong>
      <p>Your presence in my life brings me joy and comfort..</p>
      <p>Let's continue to cherish our friendship and create more wonderful memories together.</p>
      <p>Take care and stay blessed,</p>
      <p>-------❤️------------❤️------------❤️---------</p>
            </div>
          </div>
          <div className="heart"></div>
        </div>
      </div>
    </div>
  );
}

export default Letter;
