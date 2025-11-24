import React from "react";
import "../main.css";

export default function PatientHistory() {
  return (
    <div className="login-page image-bg">
      <div className="login-container">
        <h2>Patient History</h2>
        <table style={{width:"100%", borderCollapse:"collapse"}}>
          <thead>
            <tr>
              <th style={{border:"1px solid #ccc", padding:"8px"}}>Date</th>
              <th style={{border:"1px solid #ccc", padding:"8px"}}>Patient</th>
              <th style={{border:"1px solid #ccc", padding:"8px"}}>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{border:"1px solid #ccc", padding:"8px"}}>2025-11-19</td>
              <td style={{border:"1px solid #ccc", padding:"8px"}}>John Doe</td>
              <td style={{border:"1px solid #ccc", padding:"8px"}}>Routine Checkup</td>
            </tr>
            <tr>
              <td style={{border:"1px solid #ccc", padding:"8px"}}>2025-11-18</td>
              <td style={{border:"1px solid #ccc", padding:"8px"}}>Mary Jane</td>
              <td style={{border:"1px solid #ccc", padding:"8px"}}>Follow-up</td>
            </tr>
          </tbody>
        </table>
      </div>
      <img src="/image/corner.png" alt="corner" className="corner-image"/>
    </div>
  );
}
