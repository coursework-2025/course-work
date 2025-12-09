// Header.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    const handleStorageChange = () => loadUser();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
    
    // Force update in same tab
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2 className="header-title">Ma mental</h2>
      </div>

      <div className="header-right">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/book-appointment">Book Appointment</Link>
          <Link to="/my-appointments">My Appointments</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>

          {/* Auth Section */}
          {user ? (
            <div className="user-dropdown">
              <button
                className="user-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Hi,{" "}
                <span className="username">
                  {user.name || user.email.split("@")[0]}
                </span>
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-item user-email">{user.email}</div>
                  <hr className="dropdown-divider" />
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="auth-link">
              Sign in / Sign up
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}