import React from 'react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Left Column - Content */}
        <div className={styles.contentColumn}>
          <h1 className={styles.title}>About Tom Dixon MD</h1>
          
          <div className={styles.paragraph}>
            <p>
              I'm a paragraph. Click here to add your own text and edit me. It's easy. 
              Just click "Edit Text" or double click me to add your own content and make 
              changes to the font. Feel free to drag and drop me anywhere you like on 
              your page. I'm a great place for you to tell a story and let your users 
              know a little more about you.
            </p>
          </div>

          <div className={styles.education}>
            <h2 className={styles.subtitle}>Education</h2>
            <p className={styles.educationItem}>
              Medical School - University of Dalton
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