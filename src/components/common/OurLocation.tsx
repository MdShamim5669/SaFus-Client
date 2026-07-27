import React from 'react';
import { SectionTitle } from './SectionTitle';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export const OurLocation: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 font-inter bg-white">
      <SectionTitle subHeading="Visit Us" heading="OUR LOCATION" />

      {/* 3 Location Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {/* Phone Card */}
        <div className="bg-[#F3F3F3] border border-gray-200 shadow-md flex flex-col h-80 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
          <div className="bg-[#D1A054] h-16 flex items-center justify-center text-white shadow-sm">
            <FaPhoneAlt className="w-6 h-6" />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center space-y-3 bg-[#F3F3F3] p-6">
            <h4 className="font-cinzel font-bold text-lg md:text-xl uppercase text-gray-900 tracking-wider">
              PHONE
            </h4>
            <p className="text-gray-700 text-base md:text-lg font-bold">
              +880 1743597989
            </p>
            <p className="text-gray-500 text-xs">Call us for reservations & catering queries</p>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-[#F3F3F3] border border-gray-200 shadow-md flex flex-col h-80 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
          <div className="bg-[#D1A054] h-16 flex items-center justify-center text-white shadow-sm">
            <FaMapMarkerAlt className="w-6 h-6" />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center space-y-3 bg-[#F3F3F3] p-6">
            <h4 className="font-cinzel font-bold text-lg md:text-xl uppercase text-gray-900 tracking-wider">
              ADDRESS
            </h4>
            <p className="text-gray-800 text-sm md:text-base font-bold leading-relaxed">
              Daffodil International University
            </p>
            <p className="text-gray-600 text-xs md:text-sm font-medium">
              Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Working Hours Card */}
        <div className="bg-[#F3F3F3] border border-gray-200 shadow-md flex flex-col h-80 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
          <div className="bg-[#D1A054] h-16 flex items-center justify-center text-white shadow-sm">
            <FaClock className="w-6 h-6" />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center space-y-2 bg-[#F3F3F3] p-6">
            <h4 className="font-cinzel font-bold text-lg md:text-xl uppercase text-gray-900 tracking-wider">
              WORKING HOURS
            </h4>
            <p className="text-gray-700 text-sm md:text-base font-bold">
              Mon - Fri: 08:00 AM - 10:00 PM
            </p>
            <p className="text-gray-700 text-sm md:text-base font-bold">
              Sat - Sun: 10:00 AM - 11:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Interactive Google Map */}
      <div className="mt-12 rounded-2xl overflow-hidden border border-gray-300 shadow-xl h-96">
        <iframe
          title="SaFus Restaurant Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.4285818987483!2d90.31885447605995!3d23.874404784725048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDaffodil%20International%20University!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};
