import React from 'react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Left Column - Content */}
        <div className={styles.contentColumn}>
          <h1 className={styles.title}>About Ma Mental</h1>
          
          <div className={styles.paragraph}>
            <p>
             Mental health is a vital aspect of our overall well-being, influencing how we think, feel, and interact. It's just as important as physical health, and seeking help is a sign of strength, not weakness.
              At Ma mental, we're dedicated to promoting mental health awareness, providing support, and breaking the stigma surrounding mental illness. Our goal is to create a safe space for open conversations, education, and healing.
            </p>
          </div>

          <div className={styles.education}>
            <h2 className={styles.subtitle}>where we are located</h2>
            <p className={styles.educationItem}>
              Khan kikoni makerere road, Kampala, Uganda
            </p>
          </div>
        </div>

        {/* Right Column - Image (Optional) */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <img 
              src="https://plus.unsplash.com/premium_photo-1723838443724-e0b888f13084?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWZyaWNhbiUyMGRvY3RvciUyMG9uJTIwbWVudGFsJTIwaGVhbHRofGVufDB8fDB8fHww" 
              alt="Dr. Tom Dixon" 
              className={styles.doctorImage}
            />
            <div className={styles.imageOverlay}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;