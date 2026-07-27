import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { SectionTitle } from '../../components/common/SectionTitle';

import { contactFormSchema, ContactFormType } from '../../schemas';

export const Contact: React.FC = () => {
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      isRobotChecked: false,
    },
  });

  const handleCaptchaToggle = () => {
    const nextVal = !captchaChecked;
    setCaptchaChecked(nextVal);
    setValue('isRobotChecked', nextVal, { shouldValidate: true });
  };

  const onSubmit = async (data: ContactFormType) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Message Sent Successfully!',
        text: `Thank you ${data.name}, our SaFus team will reach out to you shortly.`,
        showConfirmButton: true,
        confirmButtonColor: '#D1A054',
      });

      toast.success('Your message has been sent!');
      reset();
      setCaptchaChecked(false);
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="pt-16 pb-24 font-inter bg-white">
      <Helmet>
        <title>SaFus | Contact Us</title>
        <meta
          name="description"
          content="Get in touch with SaFus. Find our phone number, address, opening hours, or send us a message directly."
        />
      </Helmet>

      {/* Hero Cover Banner with Increased Spacious Height */}
      <div
        className="relative bg-cover bg-center py-36 md:py-56 text-white text-center shadow-2xl"
        style={{ backgroundImage: `url('/assets/contact/banner.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-5xl mx-auto px-4 z-10">
          <div className="bg-black/75 p-12 md:p-20 rounded-none border border-gold-500/30 max-w-4xl mx-auto space-y-5 shadow-2xl">
            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-widest text-white">
              CONTACT US
            </h1>
            <p className="font-cinzel text-xs sm:text-base tracking-[0.3em] text-white font-bold uppercase opacity-95">
              WOULD YOU LIKE TO TRY A DISH?
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-24 space-y-28">
        {/* Section 1: OUR LOCATION */}
        <div>
          <SectionTitle subHeading="Visit Us" heading="OUR LOCATION" />

          {/* 3 Location Info Cards with Increased Height */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Phone Card */}
            <div className="bg-[#F3F3F3] p-8 text-center border border-gray-200 shadow-md flex flex-col h-80 md:h-96 rounded-none">
              <div className="bg-[#D1A054] h-16 flex items-center justify-center text-white mb-8 shadow-sm">
                <FaPhoneAlt className="w-6 h-6" />
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-3 bg-[#F3F3F3] p-6">
                <h4 className="font-cinzel font-bold text-lg md:text-xl uppercase text-gray-900 tracking-wider">
                  PHONE
                </h4>
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  +38 (012) 34 56 789
                </p>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-[#F3F3F3] p-8 text-center border border-gray-200 shadow-md flex flex-col h-80 md:h-96 rounded-none">
              <div className="bg-[#D1A054] h-16 flex items-center justify-center text-white mb-8 shadow-sm">
                <FaMapMarkerAlt className="w-6 h-6" />
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-3 bg-[#F3F3F3] p-6">
                <h4 className="font-cinzel font-bold text-lg md:text-xl uppercase text-gray-900 tracking-wider">
                  ADDRESS
                </h4>
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  +38 (012) 34 56 789
                </p>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-[#F3F3F3] p-8 text-center border border-gray-200 shadow-md flex flex-col h-80 md:h-96 rounded-none">
              <div className="bg-[#D1A054] h-16 flex items-center justify-center text-white mb-8 shadow-sm">
                <FaClock className="w-6 h-6" />
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-2 bg-[#F3F3F3] p-6">
                <h4 className="font-cinzel font-bold text-lg md:text-xl uppercase text-gray-900 tracking-wider">
                  WORKING HOURS
                </h4>
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  Mon - Fri: 08:00 - 22:00
                </p>
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  Sat - Sun: 10:00 - 23:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: CONTACT FORM */}
        <div>
          <SectionTitle subHeading="Send Us a Message" heading="CONTACT FORM" />

          <div className="bg-[#F3F3F3] p-10 md:p-20 rounded-none border border-gray-200 shadow-xl mt-12 max-w-5xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Name & Email in 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2.5">
                    Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    {...register('name')}
                    className="w-full px-5 py-4 text-sm md:text-base bg-white border border-gray-300 rounded-none focus:outline-none focus:border-[#D1A054] text-gray-800 shadow-sm"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2.5">
                    Email*
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                    className="w-full px-5 py-4 text-sm md:text-base bg-white border border-gray-300 rounded-none focus:outline-none focus:border-[#D1A054] text-gray-800 shadow-sm"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2.5">
                  Phone*
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register('phone')}
                  className="w-full px-5 py-4 text-sm md:text-base bg-white border border-gray-300 rounded-none focus:outline-none focus:border-[#D1A054] text-gray-800 shadow-sm"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>}
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2.5">
                  Message*
                </label>
                <textarea
                  rows={9}
                  placeholder="Write your message here"
                  {...register('message')}
                  className="w-full px-5 py-4 text-sm md:text-base bg-white border border-gray-300 rounded-none focus:outline-none focus:border-[#D1A054] text-gray-800 shadow-sm resize-y"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message.message}</p>}
              </div>

              {/* reCAPTCHA Widget */}
              <div className="pt-2">
                <div
                  onClick={handleCaptchaToggle}
                  className="inline-flex items-center space-x-4 bg-white border border-gray-300 rounded-none p-3.5 shadow-sm cursor-pointer select-none"
                >
                  <div
                    className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-colors ${
                      captchaChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-400 bg-white'
                    }`}
                  >
                    {captchaChecked && <FaCheck className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700">I'm not a robot</span>
                  <div className="flex flex-col items-center pl-4 border-l border-gray-200">
                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-6 h-6 object-contain" />
                    <span className="text-[8px] text-gray-400">reCAPTCHA</span>
                  </div>
                </div>
                {errors.isRobotChecked && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.isRobotChecked.message}</p>
                )}
              </div>

              {/* Send Message Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center space-x-3 px-10 py-4 bg-[#835D23] hover:bg-[#6c4c1b] text-white font-cinzel font-bold text-sm md:text-base uppercase rounded-none tracking-widest transition-colors shadow-lg disabled:opacity-50"
                >
                  <span>Send Message</span>
                  <FaPaperPlane className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
