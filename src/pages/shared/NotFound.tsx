import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaHome, FaTachometerAlt, FaArrowLeft, FaUtensils, FaCompass } from 'react-icons/fa';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#0B0F17] text-white overflow-hidden font-inter">
      <Helmet>
        <title>404 Page Not Found | SaFus Restaurant</title>
      </Helmet>

      {/* 3D Ambient Background Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D1A054]/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating 3D Background Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 left-12 opacity-20 text-[#D1A054] pointer-events-none"
      >
        <FaUtensils className="w-16 h-16" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-16 opacity-20 text-[#D1A054] pointer-events-none"
      >
        <FaCompass className="w-20 h-20" />
      </motion.div>

      {/* Central 3D Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl w-full bg-dark-100/80 backdrop-blur-xl p-8 md:p-14 rounded-3xl border border-[#D1A054]/40 shadow-[0_20px_50px_rgba(209,160,84,0.15)] text-center space-y-8"
      >
        {/* 3D Glowing 404 Text */}
        <div className="relative inline-block">
          <motion.h1
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="font-cinzel text-8xl md:text-9xl font-black bg-gradient-to-b from-[#FFF2B2] via-[#D1A054] to-[#835D23] bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] tracking-tight"
          >
            404
          </motion.h1>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#D1A054]/20 text-[#D1A054] font-cinzel text-xs font-bold uppercase tracking-[0.3em] px-4 py-1 rounded-full border border-[#D1A054]/40 backdrop-blur-md">
            LOST IN CUISINE
          </span>
        </div>

        {/* Informative Text */}
        <div className="space-y-3 max-w-lg mx-auto">
          <h2 className="font-cinzel text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider">
            PAGE NOT FOUND
          </h2>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
            Oops! The culinary dish or dining page you are searching for has been moved, renamed, or never existed in SaFus Restaurant menu.
          </p>
        </div>

        {/* Interactive 3D Action Buttons (Back to Home & Back to Dashboard) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* Back to Home Button */}
          <Link
            to="/"
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#D1A054] to-[#B88526] hover:from-[#e2b163] hover:to-[#c69333] text-black font-cinzel font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_25px_rgba(209,160,84,0.3)] hover:shadow-[0_15px_30px_rgba(209,160,84,0.5)] transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <FaHome className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </Link>

          {/* Back to Dashboard Button */}
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-7 py-3.5 bg-dark-200 hover:bg-dark-300 text-white font-cinzel font-bold text-xs uppercase tracking-widest rounded-xl transition-all border border-[#D1A054]/40 hover:border-[#D1A054] shadow-md transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <FaTachometerAlt className="w-4 h-4 text-[#D1A054]" />
            <span>BACK TO DASHBOARD</span>
          </Link>

          {/* Previous Page Button */}
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-5 py-3.5 text-gray-400 hover:text-white font-cinzel font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5"
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
            <span>PREVIOUS PAGE</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
