import { useState } from "react";
import axios from "axios"; // Import Axios
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // To show success/error

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Save JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      setMessage(res.data.message); // Show success message
      // Optionally redirect to dashboard
      // window.location.href = "/dashboard";
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="login-page image-bg">
      <div className="login-container">
        <h2>Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn">Login</button>
        </form>

        {message && <p style={{ marginTop: "15px", color: "green" }}>{message}</p>}

        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>

      {/* Bottom-right image */}
      <img src="/image/level2.avif" alt="Doctors team" className="corner-image" />
    </div>
  );
}
