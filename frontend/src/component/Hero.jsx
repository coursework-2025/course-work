import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
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
            src="https://player.vimeo.com/progressive_redirect/playback/7350234/rendition/720p?loc=external&signature=YOUR_SIGNATURE"
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
          <h1 className={styles.name}>D. Murphy</h1>
          <h2 className={styles.title}>Physiotherapist</h2>
          <p className={styles.specialization}>
            Specialized in Sports Injuries and Chronic Pain
          </p>
          <button className={styles.bookButton}>
            BOOK NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;