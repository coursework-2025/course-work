// src/pages/MyAppointments.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./MyAppointments.module.css"; // Changed import

export default function MyAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/auth");
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchAppointments(parsedUser.email);
  }, [navigate]);

  const fetchAppointments = async (patientEmail) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/appointments`, {
        params: { patientEmail }
      });

      console.log('Appointments response:', response.data);

      if (response.data.success) {
        setAppointments(response.data.appointments || []);
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Failed to load appointments"
        });
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setMessage({
        type: "error",
        text: "Error loading appointments. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/appointments/${id}/cancel`
      );

      if (response.data.success) {
        setMessage({
          type: "success",
          text: "Appointment cancelled successfully"
        });
        
        // Update the appointment status locally
        setAppointments(prev =>
          prev.map(app =>
            app.id === id ? { ...app, status: "cancelled" } : app
          )
        );
        
        // Auto-hide success message
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      setMessage({
        type: "error",
        text: "Failed to cancel appointment"
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#f59e0b";
      case "confirmed": return "#10b981";
      case "completed": return "#3b82f6";
      case "cancelled": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not set";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    return timeString || "Time not set";
  };

  const formatFee = (fee) => {
    return fee ? `UGX ${fee.toLocaleString()}` : "Contact for pricing";
  };

  if (loading) {
    return (
      <div className={styles.appointmentsContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading your appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.appointmentsContainer}>
      <div className={styles.appointmentsWrapper}>
        {/* Header */}
        <div className={styles.appointmentsHeader}>
          <h1>My Appointments</h1>
          <p className={styles.subtitle}>
            Manage and track all your medical appointments
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`${styles.messageAlert} ${styles[message.type]}`}>
            <span>{message.text}</span>
          </div>
        )}

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>
              {appointments.filter(a => a.status === "confirmed").length}
            </span>
            <span className={styles.statLabel}>Confirmed</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>
              {appointments.filter(a => a.status === "pending").length}
            </span>
            <span className={styles.statLabel}>Pending</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>
              {appointments.filter(a => 
                a.status !== "cancelled" && 
                a.status !== "completed" && 
                new Date(a.date) >= new Date()
              ).length}
            </span>
            <span className={styles.statLabel}>Upcoming</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>
              {appointments.filter(a => a.status === "cancelled").length}
            </span>
            <span className={styles.statLabel}>Cancelled</span>
          </div>
        </div>

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No appointments found</h3>
            <p>You don't have any appointments booked yet.</p>
            <button 
              onClick={() => navigate("/doctors")}
              className={styles.bookButton}
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          <div className={styles.appointmentsList}>
            {appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className={styles.appointmentCard}
              >
                {/* Status Badge */}
                <div 
                  className={styles.statusBadge}
                  style={{ backgroundColor: getStatusColor(appointment.status) }}
                >
                  <span>{appointment.status.toUpperCase()}</span>
                </div>

                {/* Appointment Header */}
                <div className={styles.appointmentHeader}>
                  <div className={styles.doctorInfo}>
                    <h3 className={styles.doctorName}>
                      {appointment.doctor_name || "Doctor"}
                    </h3>
                    {appointment.specialization && (
                      <p className={styles.doctorSpecialty}>
                        {appointment.specialization}
                      </p>
                    )}
                    {appointment.hospital && (
                      <p className={styles.doctorHospital}>
                        📍 {appointment.hospital}
                      </p>
                    )}
                  </div>
                  
                  <div className={styles.appointmentDatetime}>
                    <div className={styles.datetimeItem}>
                      📅 {formatDate(appointment.date)}
                    </div>
                    <div className={styles.datetimeItem}>
                      ⏰ {formatTime(appointment.time_slot)}
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className={styles.appointmentDetails}>
                  <div className={styles.detailRow}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Service:</span>
                      <span className={styles.detailValue}>{appointment.serviceType || "Consultation"}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Fee:</span>
                      <span className={styles.detailValue}>{formatFee(appointment.consultationFee)}</span>
                    </div>
                  </div>
                  
                  {appointment.bookingId && (
                    <div className={styles.detailRow}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Booking ID:</span>
                        <span className={`${styles.detailValue} ${styles.bookingId}`}>
                          {appointment.bookingId}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Appointment Actions */}
                <div className={styles.appointmentActions}>
                  {appointment.status !== "cancelled" && 
                   appointment.status !== "completed" && 
                   new Date(appointment.date) >= new Date() && (
                    <button
                      onClick={() => cancelAppointment(appointment.id)}
                      className={styles.cancelButton}
                    >
                      Cancel Appointment
                    </button>
                  )}
                  
                  {appointment.status === "cancelled" && (
                    <div className={styles.cancelledInfo}>
                      This appointment was cancelled
                    </div>
                  )}
                  
                  {appointment.status === "completed" && (
                    <div className={styles.completedInfo}>
                      This appointment has been completed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Book New Appointment Button */}
        <div className={styles.footerActions}>
          <button 
            onClick={() => navigate("/doctors")}
            className={styles.bookNewButton}
          >
            Book New Appointment
          </button>
        </div>
      </div>
    </div>
  );
}