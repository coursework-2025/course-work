import React from "react";
import "../main.css";

export default function DailySummary() {
  return (
    <div className="login-page image-bg">
      <div className="login-container">
        <h2>Daily Appointment Summary</h2>
        <ul>
          <li>09:00 - John Doe - General Checkup</li>
          <li>10:00 - Mary Jane - Blood Test</li>
          <li>11:00 - Alex Smith - Dental</li>
        </ul>
      </div>
    </div>
  );
}
