import React from "react";
import "../main.css";

export default function RegisterStaff() {
  return (
    <div className="login-page image-bg">
      <div className="login-container">
        <h2>Staff Registration</h2>
        <form className="login-form">
          <label>Name</label>
          <input type="text" placeholder="Full Name" />

          <label>Email</label>
          <input type="email" placeholder="Email" />

          <label>Password</label>
          <input type="password" placeholder="Password" />

          <label>Role</label>
          <select>
            <option>Admin</option>
            <option>Receptionist</option>
            <option>Doctor</option>
          </select>

          <button className="login-btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
