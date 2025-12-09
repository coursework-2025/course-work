import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
// App.jsx or main entry point
// import "./styles/main.css";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import RegisterPatient from "./pages/Register.jsx";
import RegisterStaff from "./pages/RegisterStaff.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import PatientProfile from "./pages/PatientProfile.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import PatientHistory from "./pages/PatientHistory.jsx";
import DailySummary from "./pages/DailySummary.jsx";
import Reports from "./pages/Reports.jsx";
import Doctors from "./pages/Doctors.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import AuthContainer from "./pages/AuthContainer.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages without header/footer */}
        <Route path="/Auth" element={<AuthContainer />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/register-staff" element={<RegisterStaff />} />

        {/* Pages with header/footer */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/dashboard" element={<Layout><PatientDashboard /></Layout>} />
        <Route path="/profile" element={<Layout><PatientProfile /></Layout>} />
        <Route path="/my-appointments" element={<Layout><MyAppointments /></Layout>} />
        <Route path="/doctor" element={<Layout><DoctorDashboard /></Layout>} />
        <Route path="/patient-history" element={<Layout><PatientHistory /></Layout>} />
        <Route path="/daily-summary" element={<Layout><DailySummary /></Layout>} />
        <Route path="/doctors" element={<Layout><Doctors /></Layout>} />
        <Route path="/reports" element={<Layout><Reports /></Layout>} />
        <Route
  path="/my-appointments"
  element={
    <Layout>
      <MyAppointments />
    </Layout>
  }
/>


        {/* Redirect unmatched paths to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
