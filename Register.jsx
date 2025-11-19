import { useState } from "react";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    role: "patient",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false); // ✅ track error or success

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      setMessage(res.data.message || "✅ Registered successfully!");
      setIsError(false); // ✅ message will be green

      // ✅ Clear form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        role: "patient",
      });

    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error occurred");
      setIsError(true); // ✅ message will be red
    }
  }

  return (
    <div className="register-page image-bg">
      <div className="register-container">
        <h2>Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter full name"
            required
            value={formData.fullName}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Gender</label>
          <select
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label>Account Type</label>
          <select
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
          >
            <option value="patient">Patient</option>
            <option value="admin">Admin</option>
            <option value="receptionist">Receptionist</option>
          </select>

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>

        {/* ✅ show success in green and error in red */}
        {message && (
          <p
            style={{
              marginTop: "15px",
              color: isError ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>

      {/* bottom image */}
      <img src="/image/team.avif" alt="Doctors team" className="corner-image" />
    </div>
  );
}
