import React, { useState } from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribe, setSubscribe] = useState(false);

  const handleSubmit = () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }
    console.log('Form submitted:', { email, subscribe });
    alert('Thank you for subscribing!');
    setEmail('');
    setSubscribe(false);
  };

  return (
    <footer className="bg-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info & Links */}
          <div>
            {/* Logo and Name */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              </div>
              <h2 className="text-4xl font-bold text-gray-800">D. Murphy</h2>
            </div>

            {/* Contact Information */}
            <div className="mb-8 text-gray-800">
              <p className="text-lg mb-1">123-456-7890</p>
              <p className="text-lg mb-6">info@mysite.com</p>
              
              <p className="text-lg">500 Terry Francine</p>
              <p className="text-lg">St. San Francisco, CA</p>
              <p className="text-lg">94158</p>
            </div>

            {/* Legal Links */}
            <div className="mb-8">
              <a href="#" className="block text-lg text-gray-800 underline hover:no-underline mb-2">
                Terms & Conditions
              </a>
              <a href="#" className="block text-lg text-gray-800 underline hover:no-underline mb-2">
                Privacy Policy
              </a>
              <a href="#" className="block text-lg text-gray-800 underline hover:no-underline mb-2">
                Refund Policy
              </a>
              <a href="#" className="block text-lg text-gray-800 underline hover:no-underline">
                Accessibility Statement
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a href="#" className="text-gray-800 hover:text-gray-600">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-800 hover:text-gray-600">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-800 hover:text-gray-600">
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Right Column - Newsletter Form */}
          <div className="flex flex-col justify-start">
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-lg text-gray-800 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-800 bg-white text-gray-800 text-lg focus:outline-none focus:border-gray-600"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="subscribe"
                  checked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                  className="mt-1 w-5 h-5 border-2 border-gray-800 focus:ring-0"
                />
                <label htmlFor="subscribe" className="text-lg text-gray-800">
                  Yes, subscribe me to your newsletter. *
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-200 hover:bg-blue-300 text-gray-800 text-lg font-semibold py-4 px-6 rounded-full transition-colors duration-200"
              >
                SUBMIT
              </button>
            </div>

            {/* Copyright */}
            <div className="mt-12 text-gray-800 text-base">
              <p>
                © 2035 by D. Murphy. Powered and secured by{' '}
                <a href="#" className="underline hover:no-underline">
                  Wix
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}