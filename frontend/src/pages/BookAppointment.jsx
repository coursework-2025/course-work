// src/pages/BookAppointment.jsx
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  addMonths, 
  subMonths,
  isAfter,
  startOfDay,
  addDays,
  isBefore
} from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  User, 
  Clock, 
  Calendar, 
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import styles from './BookAppointment.module.css';

export default function BookAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(startOfDay(addDays(new Date(), 1)));
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState('Consultation');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [doctor, setDoctor] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [bookedTimeSlots, setBookedTimeSlots] = useState([]);

  // Get doctor from location state
  useEffect(() => {
    if (location.state?.doctor) {
      setDoctor(location.state.doctor);
    } else {
      // If no doctor in state, redirect to doctors page
      navigate('/doctors');
    }
  }, [location, navigate]);

  // Check login status and get user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      navigate('/auth', { state: { from: '/book-appointment', doctor: location.state?.doctor } });
    }
  }, [navigate, location.state]);

  // Generate all possible time slots
  const allTimeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      const displayHour = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      
      // Add :00 slot
      slots.push(`${displayHour}:00 ${ampm}`);
      
      // Add :30 slot (except for 5:30 PM)
      if (hour < 17) {
        slots.push(`${displayHour}:30 ${ampm}`);
      }
    }
    return slots;
  }, []);

  // Fetch available time slots when doctor or date changes
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!doctor || !selectedDate) return;

      try {
        setLoadingAvailability(true);
        const response = await axios.get('http://localhost:5000/api/appointments/availability', {
          params: {
            doctorId: doctor._id,
            date: format(selectedDate, 'yyyy-MM-dd')
          }
        });

        if (response.data.success) {
          setAvailableTimeSlots(response.data.availableSlots);
          setBookedTimeSlots(response.data.bookedTimes);
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
        setMessage({
          type: 'error',
          text: 'Unable to load available time slots'
        });
      } finally {
        setLoadingAvailability(false);
      }
    };

    fetchAvailability();
  }, [doctor, selectedDate]);

  // Calendar setup
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayOfWeek = monthStart.getDay();
  const blanks = Array(firstDayOfWeek).fill(null);

  // Check if date is selectable
  const isDateDisabled = (date) => {
    const today = startOfDay(new Date());
    const isPast = isBefore(date, today);
    const isToday = isSameDay(date, today);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    return isPast || isWeekend;
  };

  // Check if time slot is available
  const isSlotAvailable = (slot) => {
    return availableTimeSlots.includes(slot);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleBookAppointment = async () => {
    if (!selectedTime) {
      setMessage({
        type: 'error',
        text: 'Please select a time slot'
      });
      return;
    }

    if (!user) {
      setMessage({
        type: 'error',
        text: 'Please log in to book an appointment'
      });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/appointments',
        {
          doctorId: doctor._id,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
          serviceType: selectedService,
          notes: notes,
          patientName: user.name || user.email,
          patientEmail: user.email,
          patientPhone: user.phone || ''
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setMessage({
          type: 'success',
          text: 'Appointment booked successfully! Redirecting...'
        });
        
        // Clear selections
        setSelectedTime(null);
        setNotes('');
        
        // Redirect to appointments page after 2 seconds
        setTimeout(() => {
          navigate('/appointments');
        }, 2000);
      }
    } catch (error) {
      console.error('Booking error:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to book appointment. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn || !user) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.loading}>
            <Loader2 className={styles.spinner} size={40} />
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.error}>
            <AlertCircle size={48} />
            <h2>No Doctor Selected</h2>
            <p>Please select a doctor to book an appointment.</p>
            <button 
              onClick={() => navigate('/doctors')}
              className={styles.primaryBtn}
            >
              Browse Doctors
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Back Button */}
        <button onClick={handleBack} className={styles.backButton}>
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Header */}
        <div className={styles.header}>
          <h1>Book Appointment</h1>
          <p className={styles.subtitle}>Schedule your appointment with {doctor.name}</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </div>
        )}

        <div className={styles.grid}>
          {/* Left Column - Doctor Info & Calendar */}
          <div className={styles.leftColumn}>
            {/* Doctor Info Card */}
            <div className={styles.card}>
              <div className={styles.doctorInfo}>
                <img 
                  src={doctor.avatar} 
                  alt={doctor.name} 
                  className={styles.doctorAvatar}
                  onError={(e) => {
                    e.target.src = 'https://randomuser.me/api/portraits/lego/1.jpg';
                  }}
                />
                <div className={styles.doctorDetails}>
                  <h2>{doctor.name}</h2>
                  <p className={styles.specialty}>{doctor.specialty}</p>
                  <div className={styles.doctorMeta}>
                    <span>
                      <MapPin size={16} />
                      {doctor.hospital}, {doctor.location}
                    </span>
                    <span>
                      <User size={16} />
                      {doctor.years} experience
                    </span>
                  </div>
                  <div className={styles.fee}>
                    <strong>Fee:</strong> UGX {doctor.consultationFee?.toLocaleString() || '0'}
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>Select Date</h3>
                <span className={styles.timezone}>EAT (GMT+3)</span>
              </div>

              {/* Calendar Navigation */}
              <div className={styles.calendarNav}>
                <button 
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className={styles.navButton}
                >
                  <ChevronLeft size={24} />
                </button>
                <h4>{format(currentMonth, 'MMMM yyyy')}</h4>
                <button 
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className={styles.navButton}
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Week Days */}
              <div className={styles.weekDays}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className={styles.weekDay}>{day}</div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className={styles.calendarGrid}>
                {blanks.map((_, i) => (
                  <div key={`blank-${i}`} className={styles.blankDay} />
                ))}
                {monthDays.map(day => {
                  const isSelected = isSameDay(day, selectedDate);
                  const isToday = isSameDay(day, new Date());
                  const disabled = isDateDisabled(day);

                  return (
                    <button
                      key={day.toString()}
                      onClick={() => !disabled && setSelectedDate(day)}
                      disabled={disabled}
                      className={`
                        ${styles.dayButton}
                        ${isSelected ? styles.selectedDay : ''}
                        ${isToday ? styles.today : ''}
                        ${disabled ? styles.disabledDay : ''}
                      `}
                    >
                      {format(day, 'd')}
                      {isToday && <span className={styles.todayDot} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>
                  <Calendar size={20} />
                  Available Time Slots
                </h3>
                <span className={styles.dateDisplay}>
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </span>
              </div>

              {loadingAvailability ? (
                <div className={styles.loadingSlots}>
                  <Loader2 className={styles.spinnerSmall} size={24} />
                  <p>Loading available slots...</p>
                </div>
              ) : (
                <div className={styles.timeSlotsGrid}>
                  {allTimeSlots.map(slot => {
                    const available = isSlotAvailable(slot);
                    const selected = selectedTime === slot;

                    return (
                      <button
                        key={slot}
                        onClick={() => available && setSelectedTime(slot)}
                        disabled={!available}
                        className={`
                          ${styles.timeSlotButton}
                          ${selected ? styles.selectedTimeSlot : ''}
                          ${available ? styles.availableSlot : styles.unavailableSlot}
                        `}
                        title={available ? 'Click to select' : 'Already booked'}
                      >
                        <Clock size={16} />
                        <span>{slot}</span>
                        {selected && <CheckCircle size={16} className={styles.selectedIcon} />}
                        {!available && <span className={styles.bookedBadge}>Booked</span>}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className={styles.slotInfo}>
                <div className={styles.slotStatus}>
                  <span className={styles.availableIndicator}></span>
                  <span>Available</span>
                </div>
                <div className={styles.slotStatus}>
                  <span className={styles.bookedIndicator}></span>
                  <span>Booked</span>
                </div>
                <div className={styles.slotStatus}>
                  <span className={styles.selectedIndicator}></span>
                  <span>Selected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className={styles.rightColumn}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Appointment Details</h2>
              </div>

              {/* Appointment Summary */}
              <div className={styles.summary}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Doctor:</span>
                  <span className={styles.summaryValue}>{doctor.name}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Specialty:</span>
                  <span className={styles.summaryValue}>{doctor.specialty}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Date:</span>
                  <span className={styles.summaryValue}>
                    {format(selectedDate, 'MMM d, yyyy')}
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Time:</span>
                  <span className={styles.summaryValue}>
                    {selectedTime || 'Not selected'}
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Patient:</span>
                  <span className={styles.summaryValue}>{user.name || user.email}</span>
                </div>
              </div>

              {/* Service Type */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Service Type</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className={styles.formSelect}
                >
                  <option value="Consultation">General Consultation</option>
                  <option value="Follow-up">Follow-up Visit</option>
                  <option value="Checkup">Regular Checkup</option>
                  <option value="Emergency">Emergency Visit</option>
                  <option value="Specialist">Specialist Consultation</option>
                </select>
              </div>

              {/* Additional Notes */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Additional Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={styles.formTextarea}
                  placeholder="Any specific concerns or information for the doctor..."
                  rows={3}
                />
              </div>

              {/* Fee Summary */}
              <div className={styles.feeSummary}>
                <div className={styles.feeItem}>
                  <span>Consultation Fee</span>
                  <span>UGX {doctor.consultationFee?.toLocaleString() || '0'}</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Service Charge</span>
                  <span>UGX 5,000</span>
                </div>
                <div className={`${styles.feeItem} ${styles.total}`}>
                  <span>Total Amount</span>
                  <span>UGX {(doctor.consultationFee + 5000)?.toLocaleString() || '5,000'}</span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookAppointment}
                disabled={!selectedTime || loading}
                className={styles.bookButton}
              >
                {loading ? (
                  <>
                    <Loader2 className={styles.buttonSpinner} size={20} />
                    Processing...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </button>

              {/* Booking Terms */}
              <div className={styles.terms}>
                <p>
                  By booking this appointment, you agree to our terms of service.
                  Please arrive 15 minutes before your scheduled time.
                  Cancellations must be made at least 24 hours in advance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}