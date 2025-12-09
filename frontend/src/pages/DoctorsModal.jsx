// src/components/DoctorModal.jsx
import styles from './DoctorsModal.module.css';

export default function DoctorModal({ doctor, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeBtn}>×</button>

        <div className={styles.hero}>
          <img src={doctor.avatar} alt={doctor.name} className={styles.heroImg} />
          <div>
            <h1 className={styles.modalName}>{doctor.name}</h1>
            <p className={styles.specialtyLarge}>{doctor.specialty}</p>
          </div>
        </div>

        <div className={styles.details}>
          <p>Highly experienced {doctor.specialty.toLowerCase()} dedicated to patient care.</p>
          <div className={styles.infoGrid}>
            <div>Email: {doctor.email}</div>
            <div>Phone: {doctor.phone}</div>
            <div>Joined: {doctor.joined}</div>
            <div>Status: <strong>{doctor.status}</strong></div>
          </div>
          <div className={styles.actions}>
            <button className={styles.btnPrimary}>Book Appointment</button>
            <button className={styles.btnSecondary}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}