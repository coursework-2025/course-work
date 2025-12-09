import React from 'react';
import styles from './Hero.module.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate(); // Create navigate function

  const handleBookNow = () => {
    navigate('/book-appointment'); // Navigate to booking page
  };
  return (
    <section className={styles.hero}>
      {/* Video Background */}
      <div className={styles.videoContainer}>
        <video
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        >
          <source
            src="https://www.pexels.com/download/video/6687849/"
            type="video/mp4"
          />
          {/* Fallback image if video doesn't load */}
          <img 
            src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg" 
            alt="Physiotherapy background" 
          />
        </video>
        <div className={styles.videoOverlay}></div>
      </div>

      {/* Hero Content */}
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.name}>My mental</h1>
          <h2 className={styles.title}>psychologists </h2>
          <p className={styles.specialization}>
            Mental health is just as important as physical health. Taking care of your mind is crucial for overall well-being. It's time to break the stigma and start talking about it.
          </p>
          <button onClick={handleBookNow} className={styles.bookButton}>
            Schedule an Appointment 
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;