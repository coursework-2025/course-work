// src/pages/DoctorList.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorModal from './DoctorsModal';
import styles from './DoctorList.module.css';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch doctors from backend API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        // Update this URL to match your backend endpoint
        const response = await axios.get('http://localhost:5000/api/doctors');
        
        if (response.data.success) {
          setDoctors(response.data.doctors);
        } else {
          setError('Failed to fetch doctors');
        }
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Error loading doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading doctors...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.retryButton}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Our Mental Health Doctors</h1>
        <p className={styles.subtitle}>View our professional doctors who make miracles happen</p>

        {/* Search Box */}
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by name, specialty, hospital, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.searchCount}>
            Showing {filteredDoctors.length} of {doctors.length} doctors
          </div>
        </div>

        {/* Doctors Table */}
        {filteredDoctors.length === 0 ? (
          <div className={styles.noResults}>
            <p>No doctors found matching your search. Try different keywords.</p>
          </div>
        ) : (
          <div className={styles.table}>
            {/* Table Header */}
            <div className={`${styles.row} ${styles.header}`}>
              <div className={styles.avatarCell}>Photo</div>
              <div className={styles.infoCell}>Doctor Info</div>
              <div className={styles.detailCell}>Hospital</div>
              <div className={styles.detailCell}>Location</div>
              <div className={styles.detailCell}>Experience</div>
              <div className={styles.actionCell}>Actions</div>
            </div>

            {/* Doctors List */}
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className={styles.row}
                onClick={() => setSelectedDoctor(doctor)}
              >
                <div className={styles.avatarCell}>
                  <img 
                    src={doctor.avatar} 
                    alt={doctor.name} 
                    className={styles.avatar} 
                    onError={(e) => {
                      e.target.src = 'https://randomuser.me/api/portraits/lego/1.jpg';
                    }}
                  />
                </div>
                <div className={styles.infoCell}>
                  <h3 className={styles.name}>{doctor.name}</h3>
                  <p className={styles.specialty}>{doctor.specialty}</p>
                 
                </div>
                <div className={styles.detailCell}>
                  <div className={styles.hospital}>{doctor.hospital}</div>
                </div>
                <div className={styles.detailCell}>
                  <div className={styles.location}>{doctor.location}</div>
                </div>
                <div className={styles.detailCell}>
                  <div className={styles.experience}>{doctor.years}</div>
                </div>
                <div className={styles.actionCell}>
                  <span className={styles.viewBtn}>View Profile</span>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctor Modal */}
      {selectedDoctor && (
        <DoctorModal 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
        />
      )}
    </div>
  );
}