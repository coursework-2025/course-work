// BookAppointment.jsx
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import styles from './BookAppointment.module.css';

export default function BookAppointment() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 9)); // Dec 9
  const [selectedTime, setSelectedTime] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayOfWeek = monthStart.getDay();
  const blanks = Array(firstDayOfWeek).fill(null);

  const timeSlots = ['9:00 pm', '9:30 pm', '10:00 pm', '10:30 pm', '11:00 pm', '11:30 pm'];

  const handleBack = () => {
    window.history.back(); // or use your router: navigate(-1)
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Back Button + Header */}
        <button onClick={handleBack} className={styles.backButton}>
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className={styles.header}>Schedule your service</h1>
        <p className={styles.subheader}>
          Check out our availability and book the date and time that works for you
        </p>

        <div className={styles.grid}>
          {/* Left: Calendar + Time */}
          <div>
            <div className={styles.card}>
              <div className={styles.titleRow}>
                <h2 className={styles.title}>Select a Date and Time</h2>
                <span className={styles.timezone}>East Africa Time (GMT+3)</span>
              </div>
              <hr className={styles.hr} />

              {/* Calendar */}
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

              {/* Time Slots */}
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

          {/* Right: Service Details */}
          <div className={styles.sidebar}>
            <div className={styles.card}>
              <h2 className={styles.serviceTitle}>Service Details</h2>
              <hr className={styles.hr} />

              <h3 className={styles.serviceName}>Physical Exams</h3>

              <div className={styles.selectWrapper}>
                <label className={styles.selectLabel}>More details</label>
                <select className={styles.select}>
                  <option>General Physical Exam</option>
                  <option>Pre-employment Medical</option>
                  <option>Annual Health Check</option>
                  <option>Visa Medical Exam</option>
                </select>
              </div>

              <button disabled={!selectedTime} className={styles.nextBtn}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}