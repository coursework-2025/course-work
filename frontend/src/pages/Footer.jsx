import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Contact Info Section */}
          <div className={styles.contactSection}>
            <h2 className={styles.name}>Ma mental</h2>
            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>0756953834</p>
              <p className={styles.contactItem}>mamental@info.com</p>
            </div>
            <div className={styles.address}>
              <p>Khan kikoni</p>
              <p>Wandegeya, kampala Uganda</p>
            </div>
          </div>

          {/* Links Section */}
          <div className={styles.linksSection}>
            <nav className={styles.links}>
              <a href="#" className={styles.link}>Terms & Conditions</a>
              <a href="#" className={styles.link}>Privacy Policy</a>
              <a href="#" className={styles.link}>Refund Policy</a>
              <a href="#" className={styles.link}>Accessibility Statement</a>
            </nav>
          </div>

          {/* Newsletter Section */}
          <div className={styles.newsletterSection}>
            <form className={styles.newsletterForm}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  className={styles.emailInput} 
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  id="newsletter" 
                  className={styles.checkbox}
                />
                <label htmlFor="newsletter" className={styles.checkboxLabel}>
                  Yes, subscribe me to your newsletter.*
                </label>
              </div>
              <button type="submit" className={styles.submitBtn}>
                SUBMIT
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className={styles.copyright}>
          <p>&copy; 2025 mamental.global</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;