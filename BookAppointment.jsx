import { useState, useEffect } from "react";
import "../styles/main.css";
import axios from "axios";

export default function BookAppointment({ patientId }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/doctors").then(res => setDoctors(res.data));
  }, []);

  useEffect(() => {
    if (selectedDoctor && date) {
      axios
        .get(`http://localhost:5000/doctors/${selectedDoctor}/availability?date=${date}`)
        .then(res => setSlots(res.data));
    }
  }, [selectedDoctor, date]);

  const handleBooking = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/appointments", {
        patient_id: patientId,
        doctor_id: selectedDoctor,
        date,
        time_slot: selectedSlot
      })
      .then(res => alert(res.data.message))
      .catch(err => alert(err.response.data.message));
  };

  return (
    <div className="appointment-page">
      <div className="appointment-container">
        <h2>Book Appointment</h2>
        <form onSubmit={handleBooking}>
          <label>Doctor</label>
          <select onChange={e => setSelectedDoctor(e.target.value)} required>
            <option value="">Select Doctor</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>

          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />

          <label>Time Slot</label>
          <select onChange={e => setSelectedSlot(e.target.value)} required>
            <option value="">Select Slot</option>
            {slots.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <button type="submit" className="appointment-btn">Book Appointment</button>
        </form>
      </div>
    </div>
  );
}
