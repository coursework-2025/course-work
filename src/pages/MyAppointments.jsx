import { useState, useEffect } from "react";
import "../styles/main.css";
import axios from "axios";
export default function MyAppointments({ patientId }) {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  // Load appointments for the patient
  useEffect(() => {
    axios
      .get(`http://localhost:5000/appointments/${patientId}`)
      .then(res => setAppointments(res.data))
      .catch(err => console.log(err));
  }, [patientId]);

  // Cancel appointment
  const cancelAppointment = (id) => {
    axios
      .put(`http://localhost:5000/appointments/cancel/${id}`)
      .then(res => {
        setMessage(res.data.message);
        // Remove the canceled appointment from state
        setAppointments(prev => prev.filter(a => a.id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="appointments-page">
      <h2>My Appointments</h2>
      {message && <p className="message">{message}</p>}

      {appointments.length === 0 ? (
        <p>You have no appointments booked.</p>
      ) : (
        <div className="appointments-list">
          {appointments.map(app => (
            <div key={app.id} className="appointment-card">
              <p><strong>Doctor:</strong> {app.doctor_name}</p>
              <p><strong>Specialization:</strong> {app.specialization}</p>
              <p><strong>Date:</strong> {app.date}</p>
              <p><strong>Time:</strong> {app.time_slot}</p>
              <p><strong>Status:</strong> {app.status}</p>

              <button 
                className="cancel-btn" 
                onClick={() => cancelAppointment(app.id)}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
