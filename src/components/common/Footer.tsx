import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full font-inter">
      {/* Upper Dual Split Section matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 text-white">
        {/* Left Section: CONTACT US */}
        <div className="bg-[#1F2937] py-16 px-6 md:px-16 flex flex-col items-center justify-center text-center space-y-3">
          <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white uppercase tracking-widest mb-2">
            CONTACT US
          </h3>
          <p className="text-gray-300 text-xs md:text-sm font-medium">123 ABS Street, Uni 21, Bangladesh</p>
          <p className="text-gray-300 text-xs md:text-sm font-medium">+88 123456789</p>
          <p className="text-gray-300 text-xs md:text-sm font-medium">Mon - Fri: 08:00 - 22:00</p>
          <p className="text-gray-300 text-xs md:text-sm font-medium">Sat - Sun: 10:00 - 23:00</p>
        </div>

        {/* Right Section: Follow US */}
        <div className="bg-[#111827] py-16 px-6 md:px-16 flex flex-col items-center justify-center text-center space-y-4">
          <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white uppercase tracking-widest mb-1">
            Follow US
          </h3>
          <p className="text-gray-300 text-xs md:text-sm font-medium">Join us on social media</p>
          <div className="flex items-center justify-center space-x-6 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-[#D1A054] transition-colors"
              title="Facebook"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-[#D1A054] transition-colors"
              title="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-[#D1A054] transition-colors"
              title="Twitter"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#151515] py-4 text-center text-white text-xs tracking-wider">
        <p>Copyright © CulinaryCloud. All rights reserved.</p>
      </div>
    </footer>
  );
};
