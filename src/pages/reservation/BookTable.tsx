import React from 'react';
import { SectionTitle } from '../../components/common/SectionTitle';
import { ReservationForm } from '../../components/reservation/ReservationForm';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export const BookTable: React.FC = () => {
  return (
    <div className="pt-20 pb-16">
      {/* Banner */}
      <div
        className="relative bg-cover bg-center py-20 text-white text-center shadow-xl"
        style={{ backgroundImage: `url('/assets/reservation/category-pizza.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xs"></div>
        <div className="relative max-w-4xl mx-auto px-4 z-10 space-y-4">
          <div className="bg-black/80 p-8 rounded-2xl border border-gold-500/40">
            <h1 className="font-cinzel text-4xl md:text-5xl font-extrabold uppercase text-gold-400">
              RESERVE A TABLE
            </h1>
            <p className="text-gray-300 text-sm md:text-base mt-2 font-light">
              Book your private table online to guarantee exceptional culinary service and fine dining elegance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <SectionTitle heading="BOOK A TABLE" subHeading="Reservation" />

        <div className="max-w-4xl mx-auto">
          <ReservationForm />
        </div>

        {/* Location & Operating Hours Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 text-center">
          <div className="bg-base-200 p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
            <FaPhoneAlt className="w-8 h-8 text-gold-500 mx-auto" />
            <h4 className="font-cinzel font-bold text-base uppercase">PHONE</h4>
            <p className="text-gray-500 text-sm">+88 0123456789</p>
          </div>
          <div className="bg-base-200 p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
            <FaMapMarkerAlt className="w-8 h-8 text-gold-500 mx-auto" />
            <h4 className="font-cinzel font-bold text-base uppercase">ADDRESS</h4>
            <p className="text-gray-500 text-sm">123 Chef Street, CA 90210</p>
          </div>
          <div className="bg-base-200 p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
            <FaClock className="w-8 h-8 text-gold-500 mx-auto" />
            <h4 className="font-cinzel font-bold text-base uppercase">WORKING HOURS</h4>
            <p className="text-gray-500 text-sm">Mon - Sun: 10:00am - 11:00pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};
