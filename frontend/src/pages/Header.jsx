import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h2 className="header-title">Clinic Appointment System</h2>
      </div>
      <div className="header-right">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/book-appointment">BookAppointment</Link>
          <Link to="/my-appointments">My Appointments</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/reports">Reports</Link>
        </nav>
      </div>
    </header>
  );
}
