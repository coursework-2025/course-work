import React from "react";
import "../main.css";

export default function Reports() {
  return (
    <div className="login-page image-bg">
      <div className="login-container">
        <h2>Reports & Analytics</h2>
        <h3>Appointment Reports</h3>
        <ul>
          <li>Total Appointments This Week: 24</li>
          <li>Most Popular Service: General Checkup</li>
          <li>No-Show Rate: 5%</li>
        </ul>
        <h3>Patient Statistics</h3>
        <ul>
          <li>Frequent Visitors: John Doe, Mary Jane</li>
          <li>Average Visits per Patient: 2.3</li>
        </ul>
      </div>
      <img src="/image/corner.png" alt="corner" className="corner-image"/>
    </div>
  );
}
