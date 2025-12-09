// BookAppointment.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import styles from './BookAppointment.module.css';

export default function BookAppointment() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 9));
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState('General Physical Exam');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Check login on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      setUserId(JSON.parse(user)._id); // Assume user has _id from backend
    }
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayOfWeek = monthStart.getDay();
  const blanks = Array(firstDayOfWeek).fill(null);

  const timeSlots = ['9:00 pm', '9:30 pm', '10:00 pm', '10:30 pm', '11:00 pm', '11:30 pm'];

  const handleBack = () => {
    window.history.back();
  };

  const handleBook = async () => {
    if (!selectedTime) return;
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/appointments',
        {
          userId,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
          serviceType: selectedService
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Appointment booked successfully!');
      // Reset selections
      setSelectedTime(null);
      setSelectedService('General Physical Exam');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to book appointment. Slot may be taken.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.header}>Please Log In</h1>
          <p className={styles.subheader}>You must be logged in to schedule an appointment.</p>
          <button onClick={() => navigate('/auth')} className={styles.nextBtn}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button onClick={handleBack} className={styles.backButton}>
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className={styles.header}>Schedule your service</h1>
        <p className={styles.subheader}>
          Check out our availability and book the date and time that works for you
        </p>

        {message && <p className={message.includes('success') ? styles.success : styles.error}>{message}</p>}

        <div className={styles.grid}>
          <div>
            <div className={styles.card}>
              <div className={styles.titleRow}>
                <h2 className={styles.title}>Select a Date and Time</h2>
                <span className={styles.timezone}>East Africa Time (GMT+3)</span>
              </div>
              <hr className={styles.hr} />

              <div className={styles.calendarHeader}>
                <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className={styles.navBtn}>
                  <ChevronLeft size={24} />
                </button>
                <h3 className={styles.monthTitle}>{format(currentMonth, 'MMMM yyyy')}</h3>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className={styles.navBtn}>
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className={styles.weekdays}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              <div className={styles.calendarGrid}>
                {blanks.map((_, i) => <div key={`blank-${i}`} />)}
                {monthDays.map(day => {
                  const isSelected = isSameDay(day, selectedDate);
                  const isToday = isSameDay(day, new Date());

                  return (
                    <button
                      key={day.toString()}
                      onClick={() => setSelectedDate(day)}
                      className={`${styles.dayBtn} ${isSelected ? styles.selected : ''} ${isToday && !isSelected ? styles.today : ''}`}
                    >
                      {format(day, 'd')}
                      {isToday && !isSelected && <span className={styles.todayDot} />}
                    </button>
                  );
                })}
              </div>

              <div className={styles.timeSection}>
                <p className={styles.timeHeader}>
                  Availability for {format(selectedDate, 'EEEE, MMMM d')}
                </p>
                <div className={styles.timeGrid}>
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`${styles.timeBtn} ${selectedTime === time ? styles.selected : styles.available}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.card}>
              <h2 className={styles.serviceTitle}>Service Details</h2>
              <hr className={styles.hr} />

              <h3 className={styles.serviceName}>Physical Exams</h3>

              <div className={styles.selectWrapper}>
                <label className={styles.selectLabel}>More details</label>
                <select 
                  className={styles.select} 
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option>General Physical Exam</option>
                  <option>Pre-employment Medical</option>
                  <option>Annual Health Check</option>
                  <option>Visa Medical Exam</option>
                </select>
              </div>

              <button 
                onClick={handleBook} 
                disabled={!selectedTime || loading} 
                className={styles.nextBtn}
              >
                {loading ? 'Booking...' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}