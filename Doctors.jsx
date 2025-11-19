import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/doctors")
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="page">
      <h2>Our Doctors</h2>

      <div className="doctor-list">
        {doctors.map(doc => (
          <div className="doctor-card" key={doc.id}>
            <h3>{doc.name}</h3>
            <p><strong>Specialization:</strong> {doc.specialization}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
