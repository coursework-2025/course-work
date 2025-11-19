import React, { useState } from "react";
import "../styles/main.css";

export default function PatientProfile() {
  const [profile, setProfile] = useState({ name: "John Doe", email: "john@gmail.com", contact: "12345678" });

  const handleChange = (e) => setProfile({...profile, [e.target.name]: e.target.value});
  const handleSave = (e) => { e.preventDefault(); console.log("Profile saved:", profile); };

  return (
    <div className="login-page image-bg">
      <div className="login-container">
        <h2>My Profile</h2>
        <form className="login-form" onSubmit={handleSave}>
          <label>Name</label>
          <input name="name" value={profile.name} onChange={handleChange} />
          <label>Email</label>
          <input name="email" type="email" value={profile.email} onChange={handleChange} />
          <label>Contact</label>
          <input name="contact" value={profile.contact} onChange={handleChange} />
          <button className="login-btn" type="submit">Save</button>
        </form>
      </div>
      <img src="/image/corner.png" alt="corner" className="corner-image"/>
    </div>
  );
}
