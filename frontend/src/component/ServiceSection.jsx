// Services.jsx
import React from 'react';
import styles from './ServicesSection.module.css';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'One-on-one therapy sessions',
      icon: (
        <svg className={styles.icon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="65" width="60" height="8" stroke="#2C5F9E" strokeWidth="4" fill="none"/>
          <rect x="35" y="25" width="15" height="45" stroke="#2C5F9E" strokeWidth="4" fill="none" rx="2"/>
          <circle cx="42.5" cy="20" r="3" fill="#2C5F9E"/>
          <line x1="40" y1="30" x2="45" y2="30" stroke="#FF8C42" strokeWidth="2"/>
          <line x1="40" y1="35" x2="45" y2="35" stroke="#FF8C42" strokeWidth="2"/>
          <line x1="40" y1="40" x2="45" y2="40" stroke="#FF8C42" strokeWidth="2"/>
          <line x1="40" y1="45" x2="45" y2="45" stroke="#FF8C42" strokeWidth="2"/>
          <line x1="40" y1="50" x2="45" y2="50" stroke="#FF8C42" strokeWidth="2"/>
          <path d="M 55 35 Q 60 35 60 40 L 60 55 Q 60 60 55 60" stroke="#2C5F9E" strokeWidth="4" fill="none"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Visit a mental health clinic',
      icon: (
        <svg className={styles.icon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="20" width="50" height="65" rx="3" stroke="#2C5F9E" strokeWidth="4" fill="none"/>
          <rect x="42" y="15" width="16" height="8" rx="2" stroke="#2C5F9E" strokeWidth="3" fill="none"/>
          <circle cx="50" cy="19" r="4" fill="#2C5F9E"/>
          <line x1="35" y1="35" x2="42" y2="42" stroke="#FF8C42" strokeWidth="3" strokeLinecap="round"/>
          <line x1="42" y1="42" x2="65" y2="32" stroke="#FF8C42" strokeWidth="3" strokeLinecap="round"/>
          <line x1="35" y1="52" x2="65" y2="52" stroke="#2C5F9E" strokeWidth="2.5"/>
          <line x1="35" y1="60" x2="65" y2="60" stroke="#2C5F9E" strokeWidth="2.5"/>
          <line x1="35" y1="68" x2="55" y2="68" stroke="#2C5F9E" strokeWidth="2.5"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Mental checkup',
      icon: (
        <svg className={styles.icon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="50" rx="25" ry="35" stroke="#2C5F9E" strokeWidth="4" fill="none" transform="rotate(30 50 50)"/>
          <path d="M 30 45 Q 35 40 40 45" stroke="#FF8C42" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path d="M 60 45 Q 65 40 70 45" stroke="#FF8C42" strokeWidth="3" strokeLinecap="round" fill="none"/>
        </svg>
      )
    }
  ];

  return (
    <section className={styles.services}>
         <h2 className={styles.serviceTitle}>how we can help you</h2>
      <div className={styles.container}>
        {services.map((service) => (
          <div key={service.id} className={styles.card}>
            <div className={styles.iconWrapper}>
              {service.icon}
            </div>
            <h3 className={styles.title}>{service.title}</h3>
            <button className={styles.bookBtn}>Schedule Appointment</button>
          </div>
        ))}
      </div>
    </section>
  );
}