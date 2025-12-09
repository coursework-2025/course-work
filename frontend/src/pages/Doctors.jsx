// src/pages/DoctorList.jsx
import { useState } from 'react';
import DoctorModal from './DoctorsModal';
import styles from './DoctorList.module.css';

const africanDoctors = [
  {
    name: "Dr. Aisha Mohammed",
    specialty: "Pediatrician",
    hospital: "Lagos University Teaching Hospital",
    location: "Lagos, Nigeria",
    phone: "+234 801 234 5678",
    email: "aisha.mohammed@health.ng",
    years: "12 years",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg"
  },
  {
    name: "Dr. Kwame Osei",
    specialty: "Cardiologist",
    hospital: "Korle Bu Teaching Hospital",
    location: "Accra, Ghana",
    phone: "+233 302 123 456",
    email: "kwame.osei@korlebu.gov.gh",
    years: "15 years",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Dr. Fatuma Ali",
    specialty: "Obstetrician & Gynecologist",
    hospital: "Kenyatta National Hospital",
    location: "Nairobi, Kenya",
    phone: "+254 712 345 678",
    email: "fatuma.ali@health.go.ke",
    years: "10 years",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Dr. Thabo Mokoena",
    specialty: "General Surgeon",
    hospital: "Steve Biko Academic Hospital",
    location: "Pretoria, South Africa",
    phone: "+27 12 345 6789",
    email: "thabo.mokoena@up.ac.za",
    years: "18 years",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg"
  },
  {
    name: "Dr. Chiamaka Eze",
    specialty: "Dermatologist",
    hospital: "National Hospital Abuja",
    location: "Abuja, Nigeria",
    phone: "+234 803 456 7890",
    email: "chiamaka.eze@nationalhospital.gov.ng",
    years: "9 years",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg"
  },
  {
    name: "Dr. Yonas Tekle",
    specialty: "Orthopedic Surgeon",
    hospital: "Tikur Anbessa Hospital",
    location: "Addis Ababa, Ethiopia",
    phone: "+251 911 234 567",
    email: "yonas.tekle@aau.edu.et",
    years: "14 years",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg"
  },
  {
    name: "Dr. Zainab Kamara",
    specialty: "Neurologist",
    hospital: "Connaught Hospital",
    location: "Freetown, Sierra Leone",
    phone: "+232 76 123 456",
    email: "zainab.kamara@health.gov.sl",
    years: "11 years",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg"
  },
  {
    name: "Dr. Emmanuel Nkurunziza",
    specialty: "Oncologist",
    hospital: "King Faisal Hospital",
    location: "Kigali, Rwanda",
    phone: "+250 788 123 456",
    email: "emmanuel.nkuru@kfh.rw",
    years: "16 years",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg"
  }
];

export default function DoctorList() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = africanDoctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>African Doctors Directory</h1>
        <p className={styles.subtitle}>Find experienced doctors across Africa</p>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by name, specialty, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.table}>
          {filtered.map((doctor, i) => (
            <div
              key={i}
              className={styles.row}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <div className={styles.avatarCell}>
                <img src={doctor.avatar} alt={doctor.name} className={styles.avatar} />
              </div>
              <div className={styles.infoCell}>
                <h3 className={styles.name}>{doctor.name}</h3>
                <p className={styles.specialty}>{doctor.specialty}</p>
              </div>
              <div className={styles.detailCell}>{doctor.hospital}</div>
              <div className={styles.detailCell}>{doctor.location}</div>
              <div className={styles.detailCell}>{doctor.years}</div>
              <div className={styles.actionCell}>
                <span className={styles.viewBtn}>View Profile</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDoctor && (
        <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </div>
  );
}