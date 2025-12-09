// src/components/DoctorModal.jsx
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Award, 
  Clock,
  GraduationCap,
  Languages,
  X
} from 'lucide-react';
import styles from './DoctorsModal.module.css';

export default function DoctorModal({ doctor, onClose }) {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    // Navigate to booking page with the selected doctor data
    navigate('/book-appointment', {
      state: { doctor }
    });
    onClose(); // Close the modal
  };

  const handleSendMessage = () => {
    // For now, just show an alert. You can implement messaging later
    alert(`Messaging feature for ${doctor.name} coming soon!`);
  };

  const formatFee = (fee) => {
    return fee ? `UGX ${fee.toLocaleString()}` : 'Contact for pricing';
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button onClick={onClose} className={styles.closeBtn}>
          <X size={24} />
        </button>

        {/* Doctor Header */}
        <div className={styles.header}>
          <div className={styles.avatarContainer}>
            <img 
              src={doctor.avatar} 
              alt={doctor.name} 
              className={styles.avatar}
              onError={(e) => {
                e.target.src = 'https://randomuser.me/api/portraits/lego/1.jpg';
              }}
            />
            <div className={styles.avatarBadge}>
              <Star size={14} fill="#fbbf24" />
              <span>{doctor.rating?.toFixed(1) || '4.5'}</span>
            </div>
          </div>
          
          <div className={styles.headerInfo}>
            <h1 className={styles.name}>{doctor.name}</h1>
            <p className={styles.specialty}>{doctor.specialty}</p>
            <div className={styles.headerMeta}>
              <span className={styles.metaItem}>
                <Award size={16} />
                {doctor.years || '10+ years'} experience
              </span>
              <span className={styles.metaItem}>
                <MapPin size={16} />
                {doctor.hospital}, {doctor.location}
              </span>
            </div>
          </div>
        </div>

        {/* Doctor Details Grid */}
        <div className={styles.detailsGrid}>
          {/* Contact Information */}
          <div className={styles.detailCard}>
            <h3 className={styles.detailTitle}>
              <Phone size={20} />
              Contact Information
            </h3>
            <div className={styles.detailContent}>
              <div className={styles.detailItem}>
                <Mail size={16} />
                <span>{doctor.email}</span>
              </div>
              <div className={styles.detailItem}>
                <Phone size={16} />
                <span>{doctor.phone}</span>
              </div>
            </div>
          </div>

          {/* Education */}
          {doctor.education && doctor.education.length > 0 && (
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>
                <GraduationCap size={20} />
                Education & Qualifications
              </h3>
              <div className={styles.detailContent}>
                {doctor.education.map((edu, index) => (
                  <div key={index} className={styles.educationItem}>
                    <strong>{edu.degree}</strong>
                    <span>{edu.institution} ({edu.year})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {doctor.languages && doctor.languages.length > 0 && (
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>
                <Languages size={20} />
                Languages Spoken
              </h3>
              <div className={styles.detailContent}>
                <div className={styles.languageTags}>
                  {doctor.languages.map((lang, index) => (
                    <span key={index} className={styles.languageTag}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Availability & Fees */}
          <div className={styles.detailCard}>
            <h3 className={styles.detailTitle}>
              <Clock size={20} />
              Availability & Fees
            </h3>
            <div className={styles.detailContent}>
              <div className={styles.availabilityInfo}>
                <div className={styles.availabilityItem}>
                  <span className={styles.availabilityLabel}>Consultation Fee:</span>
                  <span className={styles.availabilityValue}>
                    {formatFee(doctor.consultationFee)}
                  </span>
                </div>
                <div className={styles.availabilityItem}>
                  <span className={styles.availabilityLabel}>Availability:</span>
                  <span className={`${styles.availabilityValue} ${styles.available}`}>
                    {doctor.availability === 'available' ? 'Available Now' : 'Check Schedule'}
                  </span>
                </div>
                <div className={styles.availabilityItem}>
                  <span className={styles.availabilityLabel}>Response Time:</span>
                  <span className={styles.availabilityValue}>Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio/Description */}
          {doctor.bio && (
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>About Dr. {doctor.name.split(' ')[1]}</h3>
              <div className={styles.detailContent}>
                <p className={styles.bioText}>{doctor.bio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Doctor Bio (if exists) */}
        {doctor.bio && (
          <div className={styles.bioSection}>
            <h3 className={styles.bioTitle}>Professional Biography</h3>
            <p className={styles.bioText}>{doctor.bio}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button 
            onClick={handleBookAppointment}
            className={styles.primaryBtn}
          >
            <Calendar size={20} />
            Book Appointment
          </button>
          <button 
            onClick={handleSendMessage}
            className={styles.secondaryBtn}
          >
            <Mail size={20} />
            Send Message
          </button>
        </div>

        {/* Footer Note */}
        <div className={styles.footerNote}>
          <p>
            <Clock size={16} />
            <span>Appointments are typically confirmed within 2 hours. Please check your email for confirmation.</span>
          </p>
        </div>
      </div>
    </div>
  );
}