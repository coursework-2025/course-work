import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container image-bg">
      <div className="overlay">
        <h1 className="gold-text">Welcome to Mariam's Clinic</h1>
        <p>Book appointments easily, quickly, and securely.</p>

        {/* FIXED BUTTON LINK */}
        <button className="btn" onClick={() => navigate("/book")}>
          Book Appointment
        </button>
      </div>

      <img src="/image/team.avif" alt="Doctors team" className="corner-image" />
    </div>
  );
}
