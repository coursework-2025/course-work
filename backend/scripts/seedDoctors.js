const dotenv = require('dotenv');
const connectDB = require('../src/database/database.js'); 
const Doctor = require('../src/model/Doctor.js');

// Load environment variables
dotenv.config();

// Doctors data (your existing data)
const doctorsData = [
  {
    name: "Dr. Sarah Nakato",
    specialty: "Consultant Psychiatrist",
    hospital: "Butabika National Referral Mental Hospital",
    location: "Kampala, Uganda",
    phone: "+256 772 345 678",
    email: "s.nakato@butabika.go.ug",
    years: "14 years",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Dr. Nakato is a highly experienced consultant psychiatrist specializing in mood disorders and psychotic conditions. She has been instrumental in mental health policy development in Uganda.",
    education: [
      { degree: "MBChB", institution: "Makerere University", year: "2009" },
      { degree: "MSc Psychiatry", institution: "University of Cape Town", year: "2014" }
    ],
    languages: ["English", "Luganda", "Swahili"],
    consultationFee: 150000,
    rating: 4.8,
    totalReviews: 127
  },
  {
    name: "Dr. James Okello",
    specialty: "Clinical Psychologist",
    hospital: "Butabika National Referral Mental Hospital",
    location: "Kampala, Uganda",
    phone: "+256 700 123 456",
    email: "j.okello@butabika.go.ug",
    years: "11 years",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Clinical psychologist with extensive experience in cognitive behavioral therapy and trauma counseling. Dr. Okello has helped hundreds of patients overcome anxiety and depression.",
    education: [
      { degree: "BA Psychology", institution: "Makerere University", year: "2010" },
      { degree: "MA Clinical Psychology", institution: "University of Nairobi", year: "2013" }
    ],
    languages: ["English", "Luganda", "Acholi"],
    consultationFee: 120000,
    rating: 4.7,
    totalReviews: 98
  },
  {
    name: "Dr. Fatuma Hassan",
    specialty: "Psychiatrist (Child & Adolescent)",
    hospital: "Mathari National Teaching & Referral Mental Hospital",
    location: "Nairobi, Kenya",
    phone: "+254 712 987 654",
    email: "fatuma.hassan@matharihospital.go.ke",
    years: "10 years",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Specialist in child and adolescent psychiatry with a focus on developmental disorders, ADHD, and childhood trauma. Dr. Hassan is passionate about early intervention.",
    education: [
      { degree: "MBChB", institution: "University of Nairobi", year: "2011" },
      { degree: "MMed Psychiatry", institution: "Aga Khan University", year: "2015" }
    ],
    languages: ["English", "Swahili", "Somali"],
    consultationFee: 8000,
    rating: 4.9,
    totalReviews: 156
  },
  {
    name: "Dr. Peter Mwangi",
    specialty: "Addiction Psychiatrist",
    hospital: "Mathari National Teaching & Referral Mental Hospital",
    location: "Nairobi, Kenya",
    phone: "+254 733 456 789",
    email: "p.mwangi@matharihospital.go.ke",
    years: "16 years",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    bio: "Leading addiction psychiatrist specializing in substance abuse disorders, alcoholism, and behavioral addictions. Dr. Mwangi runs successful rehabilitation programs.",
    education: [
      { degree: "MBChB", institution: "University of Nairobi", year: "2005" },
      { degree: "MMed Psychiatry", institution: "University of Nairobi", year: "2009" },
      { degree: "Fellowship in Addiction Psychiatry", institution: "Johns Hopkins", year: "2012" }
    ],
    languages: ["English", "Swahili", "Kikuyu"],
    consultationFee: 10000,
    rating: 4.6,
    totalReviews: 203
  },
  {
    name: "Dr. Grace Namutebi",
    specialty: "Consultant Psychiatrist",
    hospital: "Mulago National Referral Hospital – Mental Health Unit",
    location: "Kampala, Uganda",
    phone: "+256 782 555 321",
    email: "grace.namutebi@mulago.go.ug",
    years: "18 years",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    bio: "Senior consultant psychiatrist with nearly two decades of experience. Dr. Namutebi specializes in severe mental illness and has trained numerous psychiatrists across East Africa.",
    education: [
      { degree: "MBChB", institution: "Makerere University", year: "2003" },
      { degree: "MMed Psychiatry", institution: "Makerere University", year: "2007" }
    ],
    languages: ["English", "Luganda", "Runyankole"],
    consultationFee: 180000,
    rating: 4.9,
    totalReviews: 241
  },
  {
    name: "Dr. Emmanuel Ochieng",
    specialty: "Forensic Psychiatrist",
    hospital: "Chiromo Hospital Group (Mental Health & De-addiction)",
    location: "Nairobi, Kenya",
    phone: "+254 721 888 999",
    email: "e.ochieng@chiromohospital.co.ke",
    years: "12 years",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    bio: "Forensic psychiatrist working at the intersection of mental health and law. Dr. Ochieng provides expert evaluations for courts and correctional facilities.",
    education: [
      { degree: "MBChB", institution: "University of Nairobi", year: "2009" },
      { degree: "MMed Psychiatry", institution: "Moi University", year: "2013" },
      { degree: "Diploma in Forensic Psychiatry", institution: "Royal College", year: "2016" }
    ],
    languages: ["English", "Swahili", "Luo"],
    consultationFee: 12000,
    rating: 4.5,
    totalReviews: 87
  },
  {
    name: "Dr. Amina Juma",
    specialty: "Clinical Psychologist & Trauma Specialist",
    hospital: "Aga Khan University Hospital – Psychiatry Department",
    location: "Nairobi, Kenya",
    phone: "+254 711 092 000",
    email: "amina.juma@aku.edu",
    years: "9 years",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    bio: "Clinical psychologist specializing in PTSD and trauma recovery. Dr. Juma has worked extensively with survivors of violence and natural disasters.",
    education: [
      { degree: "BA Psychology", institution: "University of Nairobi", year: "2012" },
      { degree: "MA Clinical Psychology", institution: "Aga Khan University", year: "2015" },
      { degree: "PhD Psychology", institution: "Aga Khan University", year: "2019" }
    ],
    languages: ["English", "Swahili", "Arabic"],
    consultationFee: 9000,
    rating: 4.8,
    totalReviews: 134
  },
  {
    name: "Dr. Moses Kizza",
    specialty: "Senior Psychiatrist",
    hospital: "Kampala International Hospital – Mental Wellness Centre",
    location: "Kampala, Uganda",
    phone: "+256 758 999 111",
    email: "m.kizza@kih.ug",
    years: "20 years",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    bio: "Veteran psychiatrist with two decades of experience treating complex mental health conditions. Dr. Kizza is known for his holistic approach to mental wellness.",
    education: [
      { degree: "MBChB", institution: "Makerere University", year: "2001" },
      { degree: "MMed Psychiatry", institution: "Makerere University", year: "2005" },
      { degree: "Fellowship in Neuropsychiatry", institution: "University of London", year: "2008" }
    ],
    languages: ["English", "Luganda", "French"],
    consultationFee: 200000,
    rating: 5.0,
    totalReviews: 312
  }
];

// Seed doctors
const seedDoctors = async () => {
  try {
    console.log('🌱 Starting doctor seeding...');
    
    // Connect to database using your existing config
    await connectDB();
    
    // Clear existing doctors
    await Doctor.deleteMany({});
    console.log('🗑️  Cleared existing doctors');

    // Insert new doctors
    const doctors = await Doctor.insertMany(doctorsData);
    console.log(`✅ Successfully seeded ${doctors.length} doctors`);

    // Display seeded doctors
    console.log('\n📋 Seeded Doctors:');
    doctors.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.name} - ${doc.specialty} at ${doc.hospital}`);
    });

    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding doctors:', error);
    process.exit(1);
  }
};

// Check if Doctor model exists, create it if not
const checkDoctorModel = () => {
  try {
    require('../src/model/Doctor.js');
  } catch (error) {
    console.log('⚠️  Doctor model not found, creating simple model...');
    const mongoose = require('mongoose');
    
    const doctorSchema = new mongoose.Schema({
      name: String,
      specialty: String,
      hospital: String,
      location: String,
      phone: String,
      email: String,
      years: String,
      avatar: String,
      bio: String,
      education: Array,
      languages: Array,
      consultationFee: Number,
      rating: Number,
      totalReviews: Number
    });
    
    // Create model if it doesn't exist
    if (mongoose.models.Doctor) {
      delete mongoose.models.Doctor;
    }
    mongoose.model('Doctor', doctorSchema);
  }
};

// Run the seeder
checkDoctorModel();
seedDoctors();