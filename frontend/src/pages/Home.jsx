import Hero from "../component/Hero";
import AboutSection from "../component/AboutSection";
import { useNavigate } from "react-router-dom";
import ServicesSection from "../component/ServiceSection";

export default function Home() {
  const navigate = useNavigate();

  // Add onClick handler to the BOOK NOW button
  const handleBookNow = () => {
    navigate('/booking'); // Or whatever route you want
  };

  return (
    <div>
      <Hero onBookNow={handleBookNow} />
      <AboutSection/>
      <ServicesSection/>
    </div>
  );
}