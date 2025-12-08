import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Contact Info Section */}
          <div className={styles.contactSection}>
            <h2 className={styles.name}>D. Murphy</h2>
            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>123-456-7890</p>
              <p className={styles.contactItem}>info@mysite.com</p>
            </div>
            <div className={styles.address}>
              <p>500 Terry Francine St.</p>
              <p>San Francisco, CA 94158</p>
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
          <p>© 2035 by D. Murphy. Powered and secured by Wix</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;