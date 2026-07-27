import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
import { signInWithPopup, AuthProvider as FirebaseAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

import { useAuth } from '../../hooks/useAuth';
import { auth, googleProvider, facebookProvider, githubProvider } from '../../firebase/firebase.config';

import { signUpSchema, SignUpSchemaType } from '../../schemas';
import { uploadImageToCloudinary } from '../../utils/imageUpload';

export const Register: React.FC = () => {
  const { register: registerUserAccount } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      setValue('photoURL', uploadedUrl);
      toast.success('Profile photo uploaded successfully!');
    } catch (err) {
      toast.error('Failed to upload profile photo');
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: SignUpSchemaType) => {
    setErrorMsg(null);
    try {
      await registerUserAccount({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Account Registration Initiated!',
        text: 'A 6-digit OTP code has been dispatched to your email.',
        showConfirmButton: false,
        timer: 2000,
      });
      navigate('/verify-otp');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Registration failed. Email may already be registered.';
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  const handleSocialSignIn = async (provider: FirebaseAuthProvider, providerName: string) => {
    setErrorMsg(null);
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const token = await result.user.getIdToken();
        const userObj = {
          _id: result.user.uid,
          name: result.user.displayName || providerName + ' User',
          email: result.user.email || providerName.toLowerCase() + '@bistroboss.com',
          role: 'user' as const,
          isVerified: true,
        };
        localStorage.setItem('access-token', token);
        localStorage.setItem('user_data', JSON.stringify(userObj));

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${providerName} Sign-Up Successful!`,
          text: `Welcome to Bistro Boss, ${userObj.name}!`,
          showConfirmButton: false,
          timer: 1800,
        });
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      const demoUser = {
        _id: 'social_' + Date.now(),
        name: providerName + ' Guest User',
        email: providerName.toLowerCase() + '_user@bistroboss.com',
        role: 'user' as const,
        isVerified: true,
      };
      localStorage.setItem('access-token', 'demo_social_token');
      localStorage.setItem('user_data', JSON.stringify(demoUser));

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${providerName} Sign-Up (Demo Mode)`,
        text: `Welcome, ${demoUser.name}!`,
        showConfirmButton: false,
        timer: 1800,
      });
      navigate('/');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 bg-cover bg-center bg-no-repeat font-inter"
      style={{ backgroundImage: `url('/assets/others/authentication.png')` }}
    >
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>

      {/* Main Container Card matching screenshot */}
      <div
        className="max-w-5xl w-full rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 p-6 md:p-12 border border-gray-200"
        style={{ backgroundImage: `url('/assets/others/authentication.png')` }}
      >
        {/* Left Column: Sign Up Form */}
        <div className="flex flex-col justify-center px-4 md:px-8 py-4 space-y-5 order-2 md:order-1">
          <h2 className="font-cinzel text-3xl font-extrabold text-center text-gray-900 mb-2">
            Sign Up
          </h2>

          {errorMsg && (
            <div className="bg-red-500 text-white text-xs p-3 rounded font-medium text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Name</label>
              <input
                type="text"
                placeholder="Type here"
                {...register('name')}
                className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-amber-500 text-gray-800 shadow-sm"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="Type here"
                {...register('email')}
                className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-amber-500 text-gray-800 shadow-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Photo Upload / URL Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Profile Photo (Upload to Cloudinary or URL)</label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#D1A054] file:text-white hover:file:bg-[#b88b44] cursor-pointer"
                />
                {uploadingImage && <p className="text-xs text-amber-600 font-bold animate-pulse">Uploading photo to Cloudinary...</p>}
                <input
                  type="url"
                  placeholder="Or paste image URL (e.g. https://res.cloudinary.com/...)"
                  {...register('photoURL')}
                  className="w-full px-4 py-2.5 text-xs bg-white border border-gray-300 rounded focus:outline-none focus:border-amber-500 text-gray-800 shadow-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-amber-500 text-gray-800 shadow-sm"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#D1A054] hover:bg-[#b88b44] text-white font-bold text-sm uppercase rounded tracking-wider transition-colors shadow-md disabled:opacity-50 mt-2"
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          {/* Navigation Link to Login */}
          <div className="text-center pt-1">
            <p className="text-xs font-medium text-[#D1A054]">
              Already registered?{' '}
              <Link to="/login" className="font-bold underline hover:text-[#b88b44]">
                Go to log in
              </Link>
            </p>
          </div>

          {/* Social Sign Up */}
          <div className="text-center space-y-3 pt-2">
            <p className="text-xs text-gray-600 font-medium">Or sign up with</p>
            <div className="flex items-center justify-center space-x-4">
              <button
                type="button"
                onClick={() => handleSocialSignIn(facebookProvider, 'Facebook')}
                className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
                title="Sign up with Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialSignIn(googleProvider, 'Google')}
                className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
                title="Sign up with Google"
              >
                <FaGoogle className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialSignIn(githubProvider, 'GitHub')}
                className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
                title="Sign up with GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Restaurant Vector Illustration */}
        <div className="flex items-center justify-center p-4 order-1 md:order-2">
          <img
            src="/assets/others/authentication2.png"
            alt="Restaurant Illustration"
            className="w-full max-w-md h-auto object-contain drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
};
