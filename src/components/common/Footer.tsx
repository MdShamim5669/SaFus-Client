import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaUtensils,
  FaChevronRight,
} from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full font-inter bg-[#111827] text-white border-t border-gold-500/20">
      {/* Main 4-Column Professional Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Brand Identity & Social Profiles */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full bg-[#D1A054] flex items-center justify-center text-black font-bold">
              <FaUtensils className="w-4 h-4" />
            </div>
            <h2 className="font-cinzel text-xl font-bold tracking-wider text-white uppercase">
              SAFUS <span className="text-[#D1A054]">RESTAURANT</span>
            </h2>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed font-light">
            Experience extraordinary culinary artistry, premium ingredients, and world-class luxury dining hospitality.
          </p>
          <div className="flex items-center space-x-3 pt-2">
            <a
              href="https://www.facebook.com/Tamjidul.islam.sham3m/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white/5 border border-gray-800 rounded-lg hover:bg-[#D1A054] hover:border-[#D1A054] hover:text-black transition-all transform hover:-translate-y-1"
              title="Facebook"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/md-samim5669/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white/5 border border-gray-800 rounded-lg hover:bg-[#D1A054] hover:border-[#D1A054] hover:text-black transition-all transform hover:-translate-y-1"
              title="LinkedIn"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/MdShamim5669"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white/5 border border-gray-800 rounded-lg hover:bg-[#D1A054] hover:border-[#D1A054] hover:text-black transition-all transform hover:-translate-y-1"
              title="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/sh4mim.py/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white/5 border border-gray-800 rounded-lg hover:bg-[#D1A054] hover:border-[#D1A054] hover:text-black transition-all transform hover:-translate-y-1"
              title="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Navigation */}
        <div className="space-y-4">
          <h3 className="font-cinzel text-sm font-bold text-[#D1A054] uppercase tracking-widest border-b border-gold-500/20 pb-2">
            QUICK NAVIGATION
          </h3>
          <ul className="space-y-2.5 text-xs text-gray-300">
            <li>
              <Link to="/" className="hover:text-[#D1A054] transition-colors flex items-center space-x-2 group">
                <FaChevronRight className="w-2.5 h-2.5 text-[#D1A054] group-hover:translate-x-1 transition-transform" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-[#D1A054] transition-colors flex items-center space-x-2 group">
                <FaChevronRight className="w-2.5 h-2.5 text-[#D1A054] group-hover:translate-x-1 transition-transform" />
                <span>Our Gourmet Menu</span>
              </Link>
            </li>
            <li>
              <Link to="/reservation" className="hover:text-[#D1A054] transition-colors flex items-center space-x-2 group">
                <FaChevronRight className="w-2.5 h-2.5 text-[#D1A054] group-hover:translate-x-1 transition-transform" />
                <span>Book a Table</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#D1A054] transition-colors flex items-center space-x-2 group">
                <FaChevronRight className="w-2.5 h-2.5 text-[#D1A054] group-hover:translate-x-1 transition-transform" />
                <span>About Our Story</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#D1A054] transition-colors flex items-center space-x-2 group">
                <FaChevronRight className="w-2.5 h-2.5 text-[#D1A054] group-hover:translate-x-1 transition-transform" />
                <span>Contact & Location</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Location */}
        <div className="space-y-4">
          <h3 className="font-cinzel text-sm font-bold text-[#D1A054] uppercase tracking-widest border-b border-gold-500/20 pb-2">
            CONTACT & LOCATION
          </h3>
          <ul className="space-y-3 text-xs text-gray-300">
            <li className="flex items-start space-x-3">
              <FaMapMarkerAlt className="w-4 h-4 text-[#D1A054] shrink-0 mt-0.5" />
              <span>123 ABS Street, Suite 21, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhoneAlt className="w-3.5 h-3.5 text-[#D1A054] shrink-0" />
              <span>+880 1700 000 000</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="w-3.5 h-3.5 text-[#D1A054] shrink-0" />
              <span>contact@safus.com</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Opening Hours */}
        <div className="space-y-4">
          <h3 className="font-cinzel text-sm font-bold text-[#D1A054] uppercase tracking-widest border-b border-gold-500/20 pb-2">
            OPENING HOURS
          </h3>
          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
              <span className="flex items-center gap-1.5"><FaClock className="w-3 h-3 text-[#D1A054]" /> Mon - Fri:</span>
              <span className="font-semibold text-white">08:00 AM - 10:00 PM</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="flex items-center gap-1.5"><FaClock className="w-3 h-3 text-[#D1A054]" /> Sat - Sun:</span>
              <span className="font-semibold text-white">10:00 AM - 11:00 PM</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Professional Copyright Bar */}
      <div className="bg-[#0b0f19] py-5 border-t border-gray-800/80 text-gray-400 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p>© {new Date().getFullYear()} <span className="text-[#D1A054] font-bold">SaFus Restaurant Ltd</span>. All Rights Reserved.</p>
          <div className="flex items-center space-x-6 text-gray-400">
            <Link to="/about" className="hover:text-[#D1A054] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-[#D1A054] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
