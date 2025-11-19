import React from "react";
import "../styles/main.css";

export default function PatientDashboard() {
  return (
    <div className="login-page image-bg">
      <div className="login-container">
        <h2>Patient Dashboard</h2>
        <button className="login-btn" onClick={()=>alert("Go to Book Appointment")}>Book Appointment</button>
        <button className="login-btn" onClick={()=>alert("View Appointments")}>My Appointments</button>
        <button className="login-btn" onClick={()=>alert("Edit Profile")}>Profile</button>
      </div>
      <img src="/image/corner.png" alt="corner" className="corner-image"/>
    </div>
  );
}
