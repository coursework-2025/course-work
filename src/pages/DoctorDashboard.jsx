import React from "react";
import "../styles/main.css";

export default function DoctorDashboard() {
  return (
    <div className="login-page image-bg">
      <div className="login-container">
        <h2>Doctor Dashboard</h2>
        <button className="login-btn" onClick={()=>alert("View Schedule")}>My Schedule</button>
        <button className="login-btn" onClick={()=>alert("Patient History")}>Patient History</button>
        <button className="login-btn" onClick={()=>alert("Manage Availability")}>Manage Availability</button>
      </div>
      <img src="/image/corner.png" alt="corner" className="corner-image"/>
    </div>
  );
}
